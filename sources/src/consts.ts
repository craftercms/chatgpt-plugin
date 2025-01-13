import { EmptyStateOption } from './ChatGPT';

export const helperWidgetId = 'craftercms.components.openai.Helper';
export const logoWidgetId = 'craftercms.components.openai.OpenAILogo';
export const chatWidgetId = 'craftercms.components.openai.ChatGPT';
export const popoverWidgetId = 'craftercms.components.openai.ChatGPTPopover';
export const openChatGptMessageId = 'craftercms.openai.OpenChatGPT';
export const chatGptResultMessageId = 'craftercms.openai.ChatGPTResult';
export const chatGptClosedMessageId = 'craftercms.openai.ChatGPTClosed';

// Default ChatGPT models
export const defaultChatModel = 'gpt-4o';
export const defaultImageModel = 'dall-e-3';
export const defaultDallEImageSize = '1024x1024';

// Lanaguge codes for speech to text
export const languageCodes = [
  { code: 'en-US', label: 'English (United States)' },
  { code: 'en-GB', label: 'English (United Kingdom)' },
  { code: 'en-CA', label: 'English (Canada)' },
  { code: 'en-AU', label: 'English (Australia)' },
  { code: 'fr-FR', label: 'French (France)' },
  { code: 'fr-CA', label: 'French (Canada)' },
  { code: 'fr-BE', label: 'French (Belgium)' },
  { code: 'fr-CH', label: 'French (Switzerland)' },
  { code: 'es-ES', label: 'Spanish (Spain)' },
  { code: 'es-MX', label: 'Spanish (Mexico)' },
  { code: 'es-AR', label: 'Spanish (Argentina)' },
  { code: 'es-CO', label: 'Spanish (Colombia)' },
  { code: 'de-DE', label: 'German (Germany)' },
  { code: 'de-AT', label: 'German (Austria)' },
  { code: 'de-CH', label: 'German (Switzerland)' },
  { code: 'pt-PT', label: 'Portuguese (Portugal)' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)' },
  { code: 'zh-CN', label: 'Chinese (Simplified, China)' },
  { code: 'zh-TW', label: 'Chinese (Traditional, Taiwan)' },
  { code: 'zh-HK', label: 'Chinese (Traditional, Hong Kong)' },
  { code: 'ja-JP', label: 'Japanese (Japan)' },
  { code: 'ko-KR', label: 'Korean (South Korea)' },
  { code: 'ru-RU', label: 'Russian (Russia)' },
  { code: 'ar-SA', label: 'Arabic (Saudi Arabia)' },
  { code: 'ar-AE', label: 'Arabic (United Arab Emirates)' },
  { code: 'it-IT', label: 'Italian (Italy)' },
  { code: 'it-CH', label: 'Italian (Switzerland)' },
  { code: 'nl-NL', label: 'Dutch (Netherlands)' },
  { code: 'nl-BE', label: 'Dutch (Belgium)' },
  { code: 'sv-SE', label: 'Swedish (Sweden)' },
  { code: 'sv-FI', label: 'Swedish (Finland)' },
  { code: 'no-NO', label: 'Norwegian (Norway)' },
  { code: 'da-DK', label: 'Danish (Denmark)' },
  { code: 'fi-FI', label: 'Finnish (Finland)' },
  { code: 'pl-PL', label: 'Polish (Poland)' },
  { code: 'cs-CZ', label: 'Czech (Czech Republic)' },
  { code: 'sk-SK', label: 'Slovak (Slovakia)' },
  { code: 'hu-HU', label: 'Hungarian (Hungary)' },
  { code: 'el-GR', label: 'Greek (Greece)' },
  { code: 'he-IL', label: 'Hebrew (Israel)' },
  { code: 'tr-TR', label: 'Turkish (Turkey)' },
  { code: 'th-TH', label: 'Thai (Thailand)' },
  { code: 'vi-VN', label: 'Vietnamese (Vietnam)' },
  { code: 'id-ID', label: 'Indonesian (Indonesia)' },
  { code: 'ms-MY', label: 'Malay (Malaysia)' },
  { code: 'hi-IN', label: 'Hindi (India)' },
  { code: 'ta-IN', label: 'Tamil (India)' },
  { code: 'te-IN', label: 'Telugu (India)' },
  { code: 'ur-PK', label: 'Urdu (Pakistan)' },
  { code: 'fa-IR', label: 'Persian (Iran)' },
  { code: 'uk-UA', label: 'Ukrainian (Ukraine)' },
  { code: 'ro-RO', label: 'Romanian (Romania)' },
  { code: 'bg-BG', label: 'Bulgarian (Bulgaria)' },
  { code: 'hr-HR', label: 'Croatian (Croatia)' },
  { code: 'sr-RS', label: 'Serbian (Serbia)' },
  { code: 'sl-SI', label: 'Slovenian (Slovenia)' },
  { code: 'lv-LV', label: 'Latvian (Latvia)' },
  { code: 'lt-LT', label: 'Lithuanian (Lithuania)' },
  { code: 'et-EE', label: 'Estonian (Estonia)' }
];

export const copyCodeSvg = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>
`;

export const copiedCodeSvg = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z" fill="currentColor"></path></svg>
`;

// Function call definitions for ChatGPT
export const functionTools = [
  {
    type: 'function',
    function: {
      name: 'publish_content',
      description:
        'Triggers a content publish action in CrafterCMS for a specific path at a specified date and time. If no currentContent or path or name parameters are available. Ask user what content to publish.',
      parameters: {
        type: 'object',
        properties: {
          internalName: {
            type: 'string',
            description:
              "Content identifier name. This usually is the page title, internal name. For example: 'Home', 'Categories', 'Search Results', or any specific names."
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the publishing path is the 'current previewing page', 'current content', or terms such as 'this content', 'this component'."
          },
          path: {
            type: 'string',
            description: "The path in CrafterCMS where the content resides. For example, '/site/website/index.xml'."
          },
          date: {
            type: 'string',
            description:
              "The scheduled date and time to publish the content in ISO 8601 format. For example, '2025-12-12T00:00:00Z'."
          },
          publishingTarget: {
            type: 'string',
            description:
              "The publishing target or environment. Possible values are 'live' or 'staging'. Default if not specified is 'live'."
          }
        },
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'analyze_template',
      description:
        'CrafterCMS allows developers to model the content as general reusable items, and fold those into pages. Pages aggregate content from components as needed and are associated with a FreeMarker template that can render the final page. This function triggers a template analyzing action in CrafterCMS for a specific path or the current previewing page. If no currentContent or path or name parameters are available. Ask user what template to update. If analyzing currentContent template, the function will resolve the template path from the current page.',
      parameters: {
        type: 'object',
        properties: {
          instructions: {
            type: 'string',
            description: 'Instructions for analyzing the template of a page or a component'
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the content path is the 'current previewing page', 'current content', 'previewing page', or terms such as 'this content', 'this page', 'this component'."
          },
          templatePath: {
            type: 'string',
            description:
              "The path in CrafterCMS where the template resides. For example, '/templates/web/pages/home.ftl'."
          },
          contentPath: {
            type: 'string',
            description:
              "The path in CrafterCMS where the content resides. For example, '/site/website/index.xml'. This path is used to resolve the template path using this function"
          }
        },
        required: ['instructions'],
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_template',
      description:
        'CrafterCMS allows developers to model the content as general reusable items, and fold those into pages. Pages aggregate content from components as needed and are associated with a FreeMarker template that can render the final page. This function triggers a template update action in CrafterCMS for a specific path or the current previewing page. If no currentContent or path or name parameters are available. Ask user what template to update. If updating currentContent template, the function will resolve the template path from the current page.',
      parameters: {
        type: 'object',
        properties: {
          instructions: {
            type: 'string',
            description: 'Instructions for updating the template of a page or a component'
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the content path is the 'current previewing page', 'current content', 'previewing page', or terms such as 'this content', 'this page', 'this component'."
          },
          templatePath: {
            type: 'string',
            description:
              "The path in CrafterCMS where the template resides. For example, '/templates/web/pages/home.ftl'."
          },
          contentPath: {
            type: 'string',
            description:
              "The path in CrafterCMS where the content resides. For example, '/site/website/index.xml'. This path is used to resolve the template path using this function"
          },
          contentType: {
            type: 'string',
            description:
              "The content type to be updated the model definition. The content type is a string start with either '/page' or '/component'. For example, updating the content type '/page/home' would result in updating the file '/config/studio/content-types/page/home/form-definition.xml'"
          }
        },
        required: ['instructions'],
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_content',
      description:
        "Update a page or component. Pages are top-level container types. Pages hold content, and optionally components. Content within pages is made up of various types, for example content can be a date, an image, or a rich text field. Components only differ from pages in that they can't render by themselves, instead, they must render within a container page or another component. The page or component path usually start with '/site/webiste', '/site/components' or '/site/taxonomy'. The content file name is XML and has .xml extension.",
      parameters: {
        type: 'object',
        properties: {
          instructions: {
            type: 'string',
            description: 'Instructions for updating the content'
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the content path is the 'current previewing page', 'current content', 'previewing page', or terms such as 'this content', 'this page', 'this component'."
          },
          contentPath: {
            type: 'string',
            description: "The path in CrafterCMS where the content resides. For example, '/site/website/index.xml'"
          }
        },
        required: ['instructions'],
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_content_type',
      description:
        "Every content object in CrafterCMS is an object associated with a Content Model. Content Models allow you to add structure to your content and facilitate consumption via various visual representations or via APIs. Content Types are limited to two core types: Pages and Components. The content model is the content pieces that will be captured from the content authors for the page or component. Content type model is defined using the file 'form-definition.xml'. For example, the content model definition file for the content type '/page/home' is located at '/config/studio/content-types/page/home/form-definition.xml'. This function triggers an update to a content model definition to includes new fields, modify existing fields.",
      parameters: {
        type: 'object',
        properties: {
          instructions: {
            type: 'string',
            description: 'Instructions for updating the content model'
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the content path is the 'current previewing page', 'current content', 'previewing page', or terms such as 'this content', 'this page', 'this component'."
          },
          contentType: {
            type: 'string',
            description:
              "The content type to be updated the model definition. The content type is a string start with either '/page' or '/component'. For example, updating the content type '/page/home' would result in updating the file '/config/studio/content-types/page/home/form-definition.xml'"
          }
        },
        required: ['instructions'],
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'revert_change',
      description:
        'Reverts or rollbacks content update to a previous version in CrafterCMS. If no `path` is provided and `currentContent` is used, make sure to ask the user what is the `revertType` in the case `revertType` is not provided.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'The path of the content to revert.'
          },
          currentContent: {
            type: 'boolean',
            description:
              "A flag which is true if the content path is the 'current previewing page', 'current content', 'previewing page', or terms such as 'this content', 'this page', 'this component'."
          },
          revertType: {
            type: 'string',
            description:
              'If currentContent is true. This parameter is required to know that kind of data to revert. The possible values are: content, template, contentType'
          }
        },
        additionalProperties: false
      }
    }
  }
];

// Default prompt options for chat mode
export const chatGptEmptyStateOptionsChat: Array<EmptyStateOption> = [
  {
    id: 'useCasualTone',
    title: 'Set a casual tone for the AI content',
    subheader: 'e.g. Ready to chat about anything you like!',
    messages: [
      {
        role: 'system',
        content:
          'Answer upcoming questions using casual, informal language to convey a casual conversation with a real person. Confirm and ask the user for a prompt to begin working'
      }
    ]
  },
  {
    id: 'useProfessionalTone',
    title: 'Set a formal tone for the AI content',
    subheader: 'e.g. How may I be of assistance to you today?',
    messages: [
      {
        role: 'system',
        content:
          'Answers upcoming questions using polished, formal, and respectful language to convey professional expertise and competence. Acknowledge and ask the user for a prompt to begin working'
      }
    ]
  },
  {
    id: 'generateTitle',
    title: 'Suggest title for your content',
    prompt: 'Suggest a title for an article. Topic: '
  },
  {
    id: 'generateBody',
    title: 'Generate a body for your an article',
    prompt: 'Write the body for an article. Topic: '
  }
];

// Default prompt options for image generating mode
export const emptyStateOptionsGenerateImages: Array<EmptyStateOption> = [
  {
    id: 'generateCasualImage',
    title: 'Create an image with a casual vibe',
    subheader: 'e.g. Design a fun, relaxed scene!',
    prompt: 'Generate an image with a casual, informal theme. Include this text in the design: '
  },
  {
    id: 'generateFormalImage',
    title: 'Create an image with a professional tone',
    subheader: 'e.g. Depict a sleek, corporate environment',
    prompt: 'Generate an image with a polished, formal theme. Include this text in the design: '
  },
  {
    id: 'generateTitleImage',
    title: 'Incorporate a title into your image',
    prompt: 'Create an image based on a title. Title: '
  },
  {
    id: 'generateBodyImage',
    title: 'Incorporate a body of text into your image',
    prompt: 'Generate an image based on an article body text concept. Concept: '
  }
];

// Default function call system message
export const defaultFunctionCallSystemMessage = {
  role: 'system',
  content: `
    You are Crafter Studio's helpful CrafterCMS and content management assistant.
    Use your expertise to support the author with CrafterCMS content operations, including:
    - Creating and updating content
    - Updating CrafterCMS Freemarker templates
    - Updating CrafterCMS content models
    - Revert / undo changes to previous versions
    - Publishing,
    - Managing, and troubleshooting content-related tasks.
    Utilize the supplied tools to provide accurate and efficient assistance.
  `
};
