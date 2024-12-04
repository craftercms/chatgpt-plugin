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
    return window.craftercms.getStore().getState().preview.guest.path;
  }

  return await fetchContentPath(internalName);
}

/**
 * Resolve template path from content path
 * @param contentPath the content path (page, component)
 * @returns template path if available, empty otherwise
 */
export async function resolveTemplatePath(contentPath: string) {
  if (!contentPath) {
    contentPath = window.craftercms.getStore().getState().preview.guest.path;
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
 * Update a template with ChatGPT
 * @param templatePath the template path to fetch it's content
 * @param instruction the instruction to update template
 */
export async function updateTemplate(templatePath: string, instructions: string) {
  const templateContent = await fetchContent(templatePath);
  const stream = await createChatCompletion({
    model: defaultChatModel,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful customer support assistant and a guru in CrafterCMS. Use your expertise to support the author with CrafterCMS content operations, including publishing, managing, and troubleshooting content-related tasks. Utilize the supplied tools to provide accurate and efficient assistance.'
      },
      {
        role: 'user',
        content: `Here is the current template:\n\n${templateContent}`
      },
      {
        role: 'user',
        content: `Please apply the following instructions: ${instructions}. The response should only contains the updated template.`
      }
    ],
    stream: true
  });

  let updatedTemplate = '';
  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content;
    if (content) {
      updatedTemplate += content;
    }
  }

  console.log(updatedTemplate);

  if (updatedTemplate) {
    updatedTemplate = updatedTemplate.replace(/```[a-zA-Z]*\s*(.*?)\s*```/gs, '$1').trim();
    return await writeContent(templatePath, updatedTemplate);
  }

  return {
    succeed: false,
    message: `Error updating content at path '${templatePath}'. Please try again later or contact administration.`
  };
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

      if (!args.templatePath) {
        return {
          succeed: false,
          message:
            "I'm not able to resolve the template path from current context. Could you please provide more detail the template you would like to update?"
        };
      }

      return await updateTemplate(args.templatePath, args.instructions);
    }

    default:
      throw new Error('No function found');
  }
}
