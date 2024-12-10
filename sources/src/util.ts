import OpenAI from 'openai';
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionCreateParams,
  ChatCompletionCreateParamsBase,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming
} from 'openai/src/resources/chat/completions';
import { ImageCreateParams } from 'openai/src/resources/images';
import * as Core from 'openai/src/core';
import { APIPromise } from 'openai/src/core';
import { Stream } from 'openai/src/streaming';
import { RequestInfo, Response } from 'openai/_shims';
import { User } from '@craftercms/studio-ui';
import { PublishingParams, PublishingTargets } from '@craftercms/studio-ui/models/Publishing';
import { defaultChatModel } from './consts';
import { getHostToHostBus, getHostToGuestBus } from '@craftercms/studio-ui/utils/subjects';
import { reloadRequest } from '@craftercms/studio-ui/state/actions/preview';
import { stripDuplicateSlashes } from '@craftercms/studio-ui/utils/path';
import { fetchConfigurationXML, writeConfiguration } from '@craftercms/studio-ui/services/configuration';
import { firstValueFrom } from 'rxjs';

let openai: OpenAI;
const getOpenAiInstance =
  import.meta.env.MODE === 'development'
    ? () => {
        if (openai) {
          return openai;
        } else {
          return (openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
          }));
        }
      }
    : () => {
        if (openai) {
          return openai;
        } else {
          const state = window.craftercms.getStore().getState();
          const siteId = state.sites.active;
          const authoringBase = state.env.authoringBase;
          const baseOptions = { maxRetries: 0, dangerouslyAllowBrowser: true };
          const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
          return (openai = new OpenAI({
            ...baseOptions,
            // When we have a working proxy service....
            // apiKey: null,
            // baseURL: `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/v1/proxy?siteId=${siteId}`
            // Meanwhile...
            apiKey: null,
            // Retrieves the key when first invoked. Then caches it.
            fetch: async (url: RequestInfo, init?: RequestInfo): Promise<Response> =>
              fetch(`${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/key?siteId=${siteId}`, {
                headers
              })
                .then((response) => response.json())
                .then((response) => {
                  init.headers['authorization'] = `Bearer ${response.result}`;
                  openai = new OpenAI({ ...baseOptions, apiKey: response.result });
                  return fetch(url, init);
                })
          }));
        }
      };

export function createChatCompletion(
  body: ChatCompletionCreateParamsNonStreaming,
  options?: Core.RequestOptions
): APIPromise<ChatCompletion>;
export function createChatCompletion(
  body: ChatCompletionCreateParamsStreaming,
  options?: Core.RequestOptions
): APIPromise<Stream<ChatCompletionChunk>>;
export function createChatCompletion(
  body: ChatCompletionCreateParamsBase,
  options?: Core.RequestOptions
): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>;
export function createChatCompletion(
  body: ChatCompletionCreateParams,
  options?: Core.RequestOptions
): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletionChunk>>;
export function createChatCompletion(body: ChatCompletionCreateParamsBase, options?: OpenAI.RequestOptions) {
  return getOpenAiInstance().chat.completions.create(body, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: body.stream ? 'text/event-stream' : 'application/json'
    }
  });
}

export function createImageGeneration(
  body: ImageCreateParams,
  options?: Core.RequestOptions
): APIPromise<ChatCompletion> {
  return getOpenAiInstance().images.generate(body, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: 'application/json'
    }
  });
}

export function createUsername(user: User) {
  const { firstName, lastName, username } = user;
  return `${firstName} ${lastName}`.trim() || username;
}

/**
 * Fetches the list of chat or image generation models from OpenAI.
 * https://platform.openai.com/docs/models/model-endpoint-compatibility
 * @returns The list of models.
 */
export async function listChatModels() {
  try {
    const response = await getOpenAiInstance().models.list();
    return response.data
      .filter(
        (model) =>
          !model.id.includes('realtime') &&
          !model.id.includes('audio') &&
          !model.id.includes('turbo-instruct') &&
          (model.id.includes('gpt-3.5') || model.id.includes('gpt-4') || model.id.includes('dall-e'))
      )
      .sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

export interface SaveImageRequest {
  url: string;
  path: string;
  name: string;
}

/**
 * Get the image stream
 * @param url the url of the image
 */
export async function copyImageToClipboard(url: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(
    `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/image?siteId=${siteId}&url=${encodeURIComponent(url)}`,
    {
      headers
    }
  );

  if (response.ok) {
    const blob = await response.blob();
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    return true;
  } else {
    throw new Error('Failed to fetch image');
  }
}

/**
 * Save an image to the CMS
 * @param request instance of SaveImageRequest
 */
export async function saveImage(request: SaveImageRequest) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  await fetch(`${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/image?siteId=${siteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(request)
  });

  return true;
}

/**
 * Fetch memory data from CMS
 * @returns list of page items
 */
export async function fetchMemoryData() {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(
    `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/data?siteId=${siteId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }
  );

  if (response.status !== 200) {
    return {};
  }

  const data = await response.json();

  return data.result?.items;
}

/**
 * Fetch sandbox item by path
 * @param path the path to fetch
 * @returns sandbox item
 */
export async function fetchSandboxItemByPath(path: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const body = {
    siteId,
    paths: [path],
    preferContent: true
  };
  const response = await fetch(`${authoringBase}/api/2/content/sandbox_items_by_path`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  });
  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();
  return data?.items?.[0];
}

/**
 * Resolve content path base on the internal name
 * @params internalName the name of the content
 * @returns content path
 */
export async function resolveContentPath(internalName: string) {
  if (!internalName) {
    return window.craftercms.getStore().getState().preview.guest?.path;
  }

  return await fetchContentPath(internalName);
}

/**
 * Resolve the content type for the current previewing page
 * @returns content type id
 */
export async function resolveCurrentContentModel() {
  const currentPath = window.craftercms.getStore().getState().preview.guest?.path;
  if (!currentPath) {
    return '';
  }

  let storedContent = window.craftercms.getStore().getState().content.itemsByPath[currentPath];
  if (!storedContent) {
    storedContent = await fetchSandboxItemByPath(currentPath);
  }

  return storedContent.contentTypeId;
}

/**
 * Resolve site path for a type
 * @param type the type (content, template, contentType or contentModel)
 * @returns the path of the content
 */
export async function resolveCurrentPath(type: string) {
  const contentPath = window.craftercms.getStore().getState().preview.guest?.path;
  if (!contentPath) {
    return '';
  }

  if (type === 'content') {
    return contentPath;
  }

  if (type === 'template') {
    return await resolveTemplatePath(contentPath);
  }

  if (type === 'contentType' || type === 'contentModel') {
    let storedContent = window.craftercms.getStore().getState().content.itemsByPath[contentPath];
    if (!storedContent) {
      storedContent = await fetchSandboxItemByPath(contentPath);
    }
    const contentTypeId = storedContent.contentTypeId;
    return stripDuplicateSlashes(`/config/studio/content-types/${contentTypeId}/form-definition.xml`);
  }

  return '';
}

/**
 * Fetch content type description from server
 * @param contentPath the content path (page or component)
 * @returns content type description in XML format
 */
export async function fetchContentTypeDescription(contentPath: string) {
  if (!contentPath) {
    contentPath = window.craftercms.getStore().getState().preview.guest?.path;
  }

  if (!contentPath) {
    return {};
  }

  let storedContent = window.craftercms.getStore().getState().content.itemsByPath[contentPath];
  if (!storedContent) {
    storedContent = await fetchSandboxItemByPath(contentPath);
  }
  const contentTypeId = storedContent.contentTypeId;
  const path = stripDuplicateSlashes(`/content-types/${contentTypeId}/form-definition.xml`);
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  return await firstValueFrom(fetchConfigurationXML(siteId, path, 'studio'));
}

/**
 * Resolve template path from content path.
 * Use current previewing page if content path not specify
 * @param contentPath the content path (page, component)
 * @returns template path if available, empty otherwise
 */
export async function resolveTemplatePath(contentPath: string) {
  if (!contentPath) {
    contentPath = window.craftercms.getStore().getState().preview.guest?.path;
  }

  if (!contentPath) {
    return '';
  }

  let storedContent = window.craftercms.getStore().getState().content.itemsByPath[contentPath];
  if (!storedContent) {
    storedContent = await fetchSandboxItemByPath(contentPath);
  }

  const contentTypeId = storedContent.contentTypeId;
  const storedContentType = window.craftercms.getStore().getState().contentTypes.byId[contentTypeId];
  return storedContentType?.displayTemplate;
}

/**
 * Publish a content
 * @param path the path to publish
 * @param date the date to publish
 * @param environment the environment to publish, default is 'live'
 * @returns function call result
 */
export async function publishContent({
  path,
  date,
  publishingTarget = 'live'
}: {
  path: string;
  date: string;
  publishingTarget: PublishingTargets;
}) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const body: PublishingParams = {
    publishingTarget,
    items: [path],
    sendEmailNotifications: false,
    comment: `Publish content ${path} on ${date} with AI Assistant`
  };
  if (date) {
    body.schedule = date;
  }
  const response = await fetch(`${authoringBase}/api/2/workflow/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      siteId,
      ...body
    })
  });
  const succeed = response.status === 200;
  const dateMessage = date ? `on ${date}` : 'now';
  return {
    succeed,
    message: succeed
      ? `Your content at path '${path}' has been scheduled to publish ${dateMessage} to the target '${publishingTarget}'.`
      : 'Error publishing content. Please try again later or contact administration.'
  };
}

/**
 * Fetch item versions by path
 * @param path the path to fetch
 * @returns versions
 */
export async function fetchItemVersions(path: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(`${authoringBase}/api/2/content/item_history?siteId=${siteId}&path=${path}`, {
    headers
  });
  if (response.status !== 200) {
    return '';
  }

  const data = await response.json();
  return data?.items;
}

/**
 * Revert item to a version
 * @param path the item path
 * @param versionId the version to revert
 * @returns true if succeeded, false otherwise
 */
export async function revertItemVersion(path: string, versionId: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(
    `${authoringBase}/api/1/services/api/1/content/revert-content.json?site=${siteId}&path=${path}&version=${versionId}`,
    {
      headers
    }
  );
  return response.status === 200;
}

/**
 * Fetch the content path by name
 * @param internalName internal-name of the content
 * @returns the content path
 */
export async function fetchContentPath(internalName: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(
    `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/path?siteId=${siteId}&internalName=${internalName}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }
  );

  if (response.status !== 200) {
    return '';
  }

  const data = await response.json();
  return data.result?.path;
}

/**
 * Fetch content from CMS
 * @param path the path to fetch content
 * @returns content
 */
export async function fetchContent(path: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const response = await fetch(
    `${authoringBase}/api/1/services/api/1/content/get-content.json?edit=false&site_id=${siteId}&path=${path}`,
    {
      headers
    }
  );
  if (response.status !== 200) {
    return '';
  }

  const data = await response.json();
  return data?.content;
}

/**
 * Write a content to CMS
 * @param path the path to write
 * @param content the content to write
 */
export async function writeContent(path: string, content: string) {
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const authoringBase = state.env.authoringBase;
  const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
  const fileName = path.substring(path.lastIndexOf('/') + 1);
  const folderPath = path.substring(0, path.lastIndexOf('/'));
  const response = await fetch(
    `${authoringBase}/api/1/services/api/1/content/write-content.json?site=${siteId}&path=${folderPath}&unlock=true&fileName=${fileName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
        ...headers
      },
      body: content
    }
  );
  const succeed = response.status === 200;

  return {
    succeed,
    message: succeed
      ? `Your content at path '${path}' has been updated.`
      : `Error updating content at path '${path}'. Please try again later or contact administration.`
  };
}

/**
 * Update a page or component
 * @param contentPath the content path
 * @param instructions the instructions
 */
export async function chatGPTUpdateContent(contentPath: string, instructions: string) {
  const content = await fetchContent(contentPath);
  const contentTypeDescription = await fetchContentTypeDescription(contentPath);
  const completion = await createChatCompletion({
    model: defaultChatModel,
    messages: [
      {
        role: 'system',
        content: `
        You are Crafter Studio's helpful CrafterCMS and content management assistant.\n
        Use your expertise to support the author with CrafterCMS content operations, including:
        - Creating and updating content
        - Updating CrafterCMS Freemarker templates
        - Updating CrafterCMS content models
        - Revert / undo changes
        - Publishing,
        - Managing, and troubleshooting content-related tasks.
        Utilize the supplied tools to provide accurate and efficient assistance.`
      },
      {
        role: 'user',
        content: `Here is the current content:\n\n${content}\n\nHere is the current content model: ${JSON.stringify(contentTypeDescription)}`
      },
      {
        role: 'user',
        content: `Please apply the following instructions: ${instructions}. Keep the XML format unchange. The response should only contains the updated content in XML.`
      }
    ],
    stream: false
  });

  const message = completion.choices[0]?.message?.content;
  if (message) {
    const newContent = message.replace(/```[a-zA-Z]*\s*(.*?)\s*```/gs, '$1').trim();

    /* validate that the response is a valid XML document */
    const parser = new DOMParser();
    const doc = parser.parseFromString(newContent, "application/xml");

    // retrive the parse error if any
    const errorContent = doc.querySelector("parsererror");

    if (errorContent) {
      return {
        succeed: false,
        message: newContent
      };
    
    }
    else {
      const result = await writeContent(contentPath, newContent);
    
      if (result.succeed) {
        reloadPreview();
      }

      return result;
    }
  }

  return {
    succeed: false,
    message: `Error updating content at path '${contentPath}'. Please try again later or contact administration.`
  };
}

/**
 * Use ChatGPT to update a content type definition using user provided instructions
 * @param contentTypeId the content type id
 * @param instructions the user instructions
 * @returns message indicate if the operation is succedded or not
 */
export async function chatGPTUpdateContentType(contentTypeId: string, templatePath: string, instructions: string) {
  const path = stripDuplicateSlashes(`/content-types/${contentTypeId}/form-definition.xml`);
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const contentTypeDescriptor = await firstValueFrom(fetchConfigurationXML(siteId, path, 'studio'));
  const templateContent = await fetchContent(templatePath);

  const completion = await createChatCompletion({
    model: defaultChatModel,
    messages: [
      {
        role: 'system',
        content: `
         You are Crafter Studio's helpful CrafterCMS and content management assistant.\n\n

          Use your expertise to support the author with CrafterCMS content operations, including:\n
          - Creating and updating content\n
          - Updating CrafterCMS Freemarker templates\n
          - Updating CrafterCMS content models\n
          - Revert / undo changes to previous versions\n
          - Publishing\n
          - Managing, and troubleshooting content-related tasks\n\n

          Utilize the supplied tools to provide accurate and efficient assistance.`
      },

      {
        role: 'system',
        content: `
          When there is an instruction to update a form defintions aways eforce these rules:\n
          - The response must only contains the updated content in XML.\n
          - Never update the form definition if the response is not XML.\n
          - Do not remove or replace other fields in the model unless instructed to do so.\n
          \n\n

          When there is an instruction to add a field use th following rules:\n
          - Forms are made up of sections that contain fields. Typically related fields are grouped in a section. If it's not obvious which section to add a field to, add it to the last section.\n
          - A repeat group is a special kind of field that acts like an array and contains other fields.
          - Fields have a type that maps to the type of contnt they store:\n
          - Text should use an "input" type\n
          - Numbers should use the "numberic-input" type\n
          - Text with HTML tags should use the "rte" type\n
          - Images should use the "image-picker" type\n
          - If it's not clear what field type to use, assume the "input" type
          \n\n

          You should use the correct postfix for the id of a field using the following CSV data when there is an instruction to add a new field:\n\n
          Type,Field Suffix,Multivalue Suffix (repeating groups),Description\n
          integer,_i,_is,a 32 bit signed integer\n
          string,_s,_ss,String (UTF-8 encoded string or Unicode). A string value is indexed as a single unit.\n
          long,_l,_ls,a 64 bit signed integer\n
          text,_t,_txt,Multiple words or tokens\n
          boolean,_b,_bs,true or false\n
          float,_f,_fs,IEEE 32 bit floating point number\n
          double,_d,_ds,IEEE 64 bit floating point number\n
          date,_dt,_dts,A date in ISO 8601 date format\n
          time,_to,_tos,A time in HH:mm:ss format (the value will be set to date 1/1/1970 automatically)\n
          text with html tags,_html,,Rich Text Editor content\n'
          image,_s,,Image path\n'
          \n\n



          If asked to add new fields to the form defintion based on the content in the template, follow these guidelines:\n
          - The purpose of the form definition is to provide a schema or data structure for content in the template.\n
          - Analyze the content elements in the provided template.
          - If you find hard coded content in the form of text or images in the HTML it's example content that will ultimately be replace with a template placeholder. The aim of this task is to create a field to match and ultimately supply values to those placeholders.\n
          - if you find Freemarker variable place holders (e.g.: contentModel.PLACE_HOLDER_NAME were PLACE_HOLDER_NAME is the id of the field) it should be added as a new field if a field with that ID does not already exist.\n
          - Add new fields and/or sections to the form definition but do not remove or replace existing elements.\n
          - Create an individual field for each img element.
            If the size of the image is known, set the height and width properties according to the image requirements, for example: 						<property>
							<name>width</name>
							<value>{ &quot;exact&quot;:&quot;400&quot;, &quot;min&quot;:&quot;&quot;, &quot;max&quot;:&quot;&quot; }</value>
							<type>range</type>
						</property>
						<property>
							<name>height</name>
							<value>{ &quot;exact&quot;:&quot;400&quot;, &quot;min&quot;:&quot;&quot;, &quot;max&quot;:&quot;&quot; }</value>
							<type>range</type>
						</property>

            Always check the form definition to see if the following two datasource are in the form defintion when images fields are required:
              <datasource>
                <type>img-desktop-upload</type>
                <id>upload</id>
                <title>Upload</title>
                <interface>image</interface>
                <properties>
                  <property>
                    <name>repoPath</name>
                    <value>/static-assets/images</value>
                    <type>content-path-input</type>
                  </property>
                </properties>
              </datasource>
              <datasource>
                <type>img-repository-upload</type>
                <id>library</id>
                <title>Library</title>
                <interface>image</interface>
                <properties>
                  <property>
                    <name>repoPath</name>
                    <value>/static-assets/images</value>
                    <type>content-path-input</type>
                  </property>
                </properties>
              </datasource>\n\n

              Associate a new image or rte fields with this data source by referencing the data source id in the imageManager property like so:

              <property>
							  <name>imageManager</name>
							  <value>upload,library</value>
							  <type>datasource:image</type>
						  </property>\n
          - Create an individaul text field for each h1,h2,h3,h4,h5 element\n
          - Create an individual RTE field for any text or markup inside of div tags\n
          - Use field labels and ids that are based on the subject or purpose of the content\n
          - For each new field, set the required property to true\n
          \n\n

          \n\n`
      },
      {
        role: 'user',
        content: `Here is the content type model:\n\n${contentTypeDescriptor}\n\n this is my template:\n\n ${templateContent}`
      },
      {
        role: 'user',
        content: `Please apply the following instructions: ${instructions}. Keep the XML format unchange.`
      }
    ],
    stream: false
  });

  const message = completion.choices[0]?.message?.content;
  if (message) {
    const newContent = message.replace(/```[a-zA-Z]*\s*(.*?)\s*```/gs, '$1').trim();

    /* validate that the response is a valid XML document */
    const parser = new DOMParser();
    const doc = parser.parseFromString(newContent, "application/xml");

    // retrive the parse error if any
    const errorContent = doc.querySelector("parsererror");

    if (errorContent) {
      return {
        succeed: false,
        message: newContent
      };
    }
    
    const succeed = await firstValueFrom(writeConfiguration(siteId, path, 'studio', newContent));
    if (succeed) {
      reloadPreview();
    }

    return {
      succeed,
      message: succeed
        ? `Your content type '${contentTypeId}' has been updated.`
        : `Error updating content type '${contentTypeId}'. Please try again later or contact administration.`
    };
  }

  return {
    succeed: false,
    message: `Error updating content type '${contentTypeId}'. Please try again later or contact administration.`
  };
}

/**
 * Revert content at path to previous version
 * @param path the path to revert
 */
export async function chatGPTRevertContent(path: string) {
  const versions = await fetchItemVersions(path);
  if (!versions || versions.length <= 1) {
    return {
      succeed: false,
      messages: `No version to revert for content at path '${path}'`
    };
  }

  const previousCommitId = versions[1]?.versionNumber;
  const succeed = await revertItemVersion(path, previousCommitId);
  if (succeed) {
    reloadPreview();

    return {
      succeed,
      message: `Your content at path '${path}' has been reverted to previous version.`
    };
  }

  return {
    succeed,
    message: `Error reverting content at path '${path}' to previous version. Please try again later or contact administration.`
  };
}

/**
 * Update a template with ChatGPT
 * @param templatePath the template path to fetch it's content
 * @param instruction the instruction to update template
 */
export async function chatGPTUpdateTemplate(
  templatePath: string,
  contentPath: string,
  contentTypeId: string,
  instructions: string
) {
  const templateContent = await fetchContent(templatePath);
  const content = ''; //= await fetchContent(contentPath);
  const path = stripDuplicateSlashes(`/content-types/${contentTypeId}/form-definition.xml`);
  const state = window.craftercms.getStore().getState();
  const siteId = state.sites.active;
  const contentTypeDescriptor = await firstValueFrom(fetchConfigurationXML(siteId, path, 'studio'));

  const completion = await createChatCompletion({
    model: defaultChatModel,
    messages: [
      {
        role: 'system',
        content: `
        You are Crafter Studio's helpful CrafterCMS and content management assistant.\n\n

        Use your expertise to support the author with CrafterCMS content operations, including:\n
        - Creating and updating content\n
        - Updating CrafterCMS Freemarker templates\n
        - Updating CrafterCMS content models\n
        - Revert / undo changes to previous versions\n
        - Publishing\n
        - Managing, and troubleshooting content-related tasks\n\n

        Utilize the supplied tools to provide accurate and efficient assistance.`

      },
      {
        role: 'user',
        content: `This is the current CrafterCMS Freemarker Template:\n\n${templateContent}\n\n
                  
                  This is the current Content stuctured as an XML document:\n\n 
                  ${content}\n\n 
                  
                  Each field is an element. The element name is the field id in the content type form definition\n
                  This is the current content type form definition:\n\n
                  ${contentTypeDescriptor} \n\n 
                  
                  The form definition is an XML document that contains field elements. Each field element has an id. The id in the field is the variable name to reference in the template to retrieve the field value.\n\n

                  If asked to update the template with new markup or a new design follow thsse instructions:\n
                  - Content values should be provided as defaults to placeholder variables. For example \${contentModel.heroText_s!"My Headline"}\n
                  - Placeholder varibale names should be semantic and relate to the purpose of the content. For example: "heroText_s" for the text in a hero or "heroImage_s" for the hero background image\n
                  - The element enclosing a placeholder variable should me made editable. example: <div><@crafter.h1 $field="heroText_s">\${contentModel.heroText_s!"My Headline"}</@crafter.h1></div>\n
                  - When adding images to the template use img tags rather than putting the image url in the CSS\n
                  - Example editable div: <@crafter.div $field="description_html">\${contentModel.description_html!"Vroom Vroom, 42 and what not"}</@crafter.div>\n
                  - Example editable image: <@crafter.img $field="myImage_s" src="\${contentModel.myImage!''}" />\n
                  - Example editable h1: <@crafter.h1 $field="headline_s">\${contentModel.headline_s!"A headline"}</@crafter.h1>\n
                  - Example editable a href: <@crafter.a $field="aLink" href="\${contentModel.aLink_s!'#'}">\${contentModel.linkTitle_s!"Click Here"}</@crafter.a>\n\n

                  If asked to create or update a template with a completely new design follow this process:\n
                  1. Analyze the content and functional requirements and instructions carefully\n
                  2. Design a visual presentation with mock images and other content to meet the requirements\n
                  3. Analize the visual representation to determine what placeholders would be used in place of the image and text values\n
                  4. Update for form definiton with the new fields required by the design\n
                  5. Updatee the template using editbale placeholders where images and content will be displayed\n
                  6. Update the content xml for the page with example content.\n
                  7. This is a image url that can generate images of any size: https://placehold.co/600x400/EEE/31343C  The size parameters are in the URL. When generating default values for images use this url and generate the proper size image for the given placeholder.\n
                  \n\n`
                  },
      {
        role: 'user',
        content: `Please apply the following instructions: ${instructions}. The response should only contains the updated template.`
      }
    ],
    stream: false
  });

  const message = completion.choices[0]?.message?.content;
  if (message) {
    const newTemplate = message.replace(/```[a-zA-Z]*\s*(.*?)\s*```/gs, '$1').trim();
    const result = await writeContent(templatePath, newTemplate);
    if (result.succeed) {
      reloadPreview();
    }
    return result;
  }

  return {
    succeed: false,
    message: `Error updating content at path '${templatePath}'. Please try again later or contact administration.`
  };
}

/**
 * Reload current preview
 */
export function reloadPreview() {
  const action = reloadRequest();
  getHostToGuestBus().next(action);
  getHostToHostBus().next(action);
}

export interface FunctionCallResult {
  succeed: boolean;
  message: string;
}

/**
 * Call a function with ChatGPT
 * @param name the function name
 * @param params parameters in string
 */
export async function chatGPTFunctionCall(name: string, params: string = '') {
  const args = JSON.parse(params);
  switch (name) {
    case 'publish_content': {
      if (!args.path && !args.currentContent && !args.internalName) {
        break;
      }

      if (!args.path && args.currentContent) {
        args.path = await resolveContentPath('');
      } else if (!args.path && args.internalName) {
        args.path = await resolveContentPath(args.internalName);
      }

      if (!args.path) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the path from current context. Could you please provide more detail the content you would like to publish?"
        };
      }

      return await publishContent(args);
    }

    case 'update_template': {
      if (!args.instructions) {
        break;
      }

      if (!args.currentContent && !args.templatePath && !args.contentPath) {
        break;
      }

      if (!args.templatePath && args.currentContent) {
        args.templatePath = await resolveTemplatePath('');
      } else if (!args.templatePath && args.contentPath) {
        args.templatePath = await resolveTemplatePath(args.contentPath);
      }

      if (!args.contetType) {
        args.contentType = await resolveCurrentContentModel();
      }

      if (!args.templatePath) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the template path from current context. Could you please provide more detail the template you would like to update?"
        };
      }

      return await chatGPTUpdateTemplate(args.templatePath, args.contentPath, args.contentType, args.instructions);
    }

    case 'update_content': {
      if (!args.instructions) {
        break;
      }

      if (!args.currentContent && !args.contentPath) {
        break;
      }

      if (!args.contentPath && args.currentContent) {
        args.contentPath = await resolveContentPath('');
      }

      if (!args.contentPath) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the content path from current context. Could you please provide more detail the content you would like to update?"
        };
      }

      return await chatGPTUpdateContent(args.contentPath, args.instructions);
    }

    case 'update_content_type': {
      if (!args.instructions) {
        break;
      }

      if (!args.contentType && args.currentContent) {
        args.contentType = await resolveCurrentContentModel();
      }
      if (!args.templatePath && args.currentContent) {
        args.templatePath = await resolveTemplatePath('');
      } else if (!args.templatePath && args.contentPath) {
        args.templatePath = await resolveTemplatePath(args.contentPath);
      }

      if (!args.contentType) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the content type from current context. Could you please provide more detail the content type you would like to update?"
        };
      }

      return await chatGPTUpdateContentType(args.contentType, args.templatePath, args.instructions);
    }

    case 'revert_change': {
      if (!args.path && !args.currentContent) {
        break;
      }

      if (!args.path) {
        args.path = await resolveCurrentPath(args.revertType);
      }

      if (!args.path) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the path from current context. Could you please provide more detail the path you would like to revert?"
        };
      }

      return await chatGPTRevertContent(args.path);
    }

    default:
      throw new Error('No function found');
  }
}
