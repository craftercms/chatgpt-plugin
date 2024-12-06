export const helperWidgetId = 'craftercms.components.openai.Helper';
export const logoWidgetId = 'craftercms.components.openai.OpenAILogo';
export const chatWidgetId = 'craftercms.components.openai.ChatGPT';
export const popoverWidgetId = 'craftercms.components.openai.ChatGPTPopover';
export const openChatGptMessageId = 'craftercms.openai.OpenChatGPT';
export const chatGptResultMessageId = 'craftercms.openai.ChatGPTResult';
export const chatGptClosedMessageId = 'craftercms.openai.ChatGPTClosed';

// default ChatGPT model
export const defaultChatModel = 'gpt-4o';
export const defaultImageModel = 'dall-e-3';

// lanaguge codes for speech to text
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

// List of function calls for ChatGPT
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
  }
];
