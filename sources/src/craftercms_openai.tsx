'use strict';
import { take, takeUntil } from 'rxjs';
import {
  Editor,
  MenuItemInstanceApi,
  MenuItemSpec,
  NestedMenuItemSpec,
  ToolbarButtonInstanceApi,
  ToolbarSplitButtonInstanceApi
} from 'tinymce';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';
import { chatGptClosedMessageId, chatGptResultMessageId, openChatGptMessageId, popoverWidgetId } from './consts.ts';
import { createUsername } from './util.ts';
import { ChatGPTProps } from './ChatGPT.tsx';
import { ChatGPTPopoverProps } from './ChatGPTPopover.tsx';

export interface CrafterCMSOpenAIConfig {
  strings?: {
    openAiDialog?: string;
    openAiShortcuts?: string;
  };
  prependMessages?: Array<ChatCompletionMessageParam>;
  shortcuts?: Array<{ label: string; messages: ChatCompletionMessageParam[] }>;
  onOpenAiDialog?(
    editor: Editor,
    api: ToolbarButtonInstanceApi | ToolbarSplitButtonInstanceApi,
    messages: ChatCompletionMessageParam[]
  ): void;
  onShortcutClick?(
    editor: Editor,
    api: ToolbarButtonInstanceApi | ToolbarSplitButtonInstanceApi,
    messages: ChatCompletionMessageParam[]
  ): void;
  emptyStateOptions?: ChatGPTProps['emptyStateOptions'];
  chatGPTPopoverProps?: Partial<ChatGPTPopoverProps>;
}

const BASE_CONFIG: Partial<CrafterCMSOpenAIConfig> = {
  strings: {
    openAiDialog: 'Open AI Assistant',
    openAiShortcuts: 'AI Shortcuts'
  },
  prependMessages: [
    // Answer the question based on the context below. The response should be in HTML format. The response should preserve any HTML formatting, links, and styles in the context.
    // {
    //   role: 'system',
    //   content:
    //     'Answer the question based on the context below in plain text format. Do not add quotes to your replies'
    // }
  ],
  shortcuts: [
    {
      label: 'Summarize Content',
      messages: [
        {
          role: 'user',
          content: 'Provide the key points and concepts in this content in a succinct summary. Context: """{context}"""'
        }
      ]
    },
    {
      label: 'Improve Writing',
      messages: [
        {
          role: 'user',
          content:
            'Rewrite this content with no spelling mistakes, proper grammar, and with more descriptive language, using best writing practices without losing the original meaning. Context: """{context}"""'
        }
      ]
    },
    {
      label: 'Simplify Language',
      messages: [
        {
          role: 'user',
          content:
            'Rewrite this content with simplified language and reduce the complexity of the writing, so that the content is easier to understand. Context: """{context}"""'
        }
      ]
    },
    {
      label: 'Expand upon',
      messages: [
        {
          role: 'user',
          content:
            'Expand upon this content with descriptive language and more detailed explanations, to make the writing easier to understand and increase the length of the content. Context: """{context}"""'
        }
      ]
    },
    {
      label: 'Trim content',
      messages: [
        {
          role: 'user',
          content:
            'Remove any repetitive, redundant, or non-essential writing in this content without changing the meaning or losing any key information. Context: """{context}"""'
        }
      ]
    },
    {
      label: 'Change Tone',
      shortcuts: [
        {
          label: 'Professional',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content using polished, formal, and respectful language to convey professional expertise and competence. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Casual',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content with casual, informal language to convey a casual conversation with a real person. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Direct',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content with direct language using only the essential information. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Confident',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content using compelling, optimistic language to convey confidence in the writing. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Friendly',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content using friendly, comforting language, to convey understanding and empathy. Context: """{context}"""'
            }
          ]
        }
      ]
    },
    {
      label: 'Change Style',
      shortcuts: [
        {
          label: 'Business',
          messages: [
            {
              role: 'user',
              content: 'Rewrite this content as a business professional with formal language. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Legal',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content as a legal professional using valid legal terminology. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Journalism',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content as a journalist using engaging language to convey the importance of the information. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Medical',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content as a medical professional using valid medical terminology. Context: """{context}"""'
            }
          ]
        },
        {
          label: 'Poetic',
          messages: [
            {
              role: 'user',
              content:
                'Rewrite this content as a poem using poetic techniques without losing the original meaning. Context: """{context}"""'
            }
          ]
        }
      ]
    }
  ],
  onOpenAiDialog: (editor) => alert(editor, 'No action configured to handle opening the AI assistant.'),
  onShortcutClick: (editor) => alert(editor, 'No action configured to handle shortcut click.')
};

const craftercms = window.craftercms;
const tinymce = window.tinymce;
const xb = craftercms?.xb;
const isXb = Boolean(xb);

const pluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

const alert = (editor, message) => {
  editor.windowManager.alert(message);
};

const setContent = (editor, html) => {
  // editor.focus();
  // editor.undoManager.transact(() => {
  //   editor.setContent(html);
  // });
  // editor.selection.setCursorLocation();
  // editor.nodeChanged();
  // editor.setContent(html);
  editor.insertContent(html);
};

const getSource = (editor) => {
  return editor.getContent({ source_view: true });
};

const getContent = (editor) => {
  return editor.getContent({ format: 'text' });
};

const getSelection = (editor) => {
  return editor.selection.getContent({ format: 'text' });
};

const handleChatActionClick = (editor: Editor, id: string, content: string) => {
  switch (id) {
    case 'insert':
      // Don't see a way of avoiding the editor regaining the focus using "insertContent".
      // editor.insertContent(content, { no_events: true, focus: false });
      // Hence, using "setContent" instead.
      editor.selection.setContent(content);
      break;
  }
};

const tellStudioToOpenChatGPT = (editor, props) => {
  xb.post(openChatGptMessageId, props);
  xb.fromTopic(chatGptClosedMessageId)
    .pipe(take(1))
    .subscribe(() => {
      setTimeout(() => editor.focus());
    });
  xb.fromTopic(chatGptResultMessageId)
    .pipe(takeUntil(xb.fromTopic(chatGptClosedMessageId)))
    .subscribe(({ payload: { id, content } }) => {
      handleChatActionClick(editor, id, content);
    });
};

const createDefaultHandler = (config) => {
  return (editor, api, messages) => {
    if (!isXb) {
      const site = craftercms.getStore().getState().sites.active;
      craftercms.services.plugin
        .importPlugin(site, 'openai', 'components', 'index.js', 'org.craftercms')
        .then((plugin) => {
          const userName = createUsername(craftercms.getStore().getState().user);
          const container = document.createElement('div');
          const root = craftercms.libs.ReactDOMClient.createRoot(container);
          const ChatGPTPopover = plugin.widgets[popoverWidgetId]; // Same as craftercms.utils.constants.components.get('...');
          const CrafterRoot = craftercms.utils.constants.components.get('craftercms.components.CrafterCMSNextBridge');
          root.render(
            <CrafterRoot>
              <ChatGPTPopover
                open
                onClose={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  root.unmount();
                  container.remove();
                }}
                {...config.chatGPTPopoverProps}
                chatGPTProps={{
                  userName,
                  emptyStateOptions: config.emptyStateOptions,
                  initialMessages: messages,
                  extraActions: [{ label: 'Insert', id: 'insert' }],
                  onExtraActionClick: ((e, id, content, api) => {
                    handleChatActionClick(editor, id, content);
                  }) as ChatGPTProps['onExtraActionClick']
                }}
              />
            </CrafterRoot>
          );
        });
    } else {
      tellStudioToOpenChatGPT(editor, {
        ...config.chatGPTPopoverProps,
        chatGPTProps: {
          ...config.chatGPTPopoverProps?.chatGPTProps,
          emptyStateOptions: config.emptyStateOptions,
          initialMessages: messages,
          extraActions: [{ label: 'Insert', id: 'insert' }]
        }
      });
    }
  };
};

pluginManager.add('craftercms_openai', function (editor: Editor) {
  const configArg = editor.getParam('craftercms_openai');
  const instanceConfig = {
    ...BASE_CONFIG,
    ...configArg
  };

  if (!configArg?.onOpenAiDialog || !configArg?.onShortcutClick) {
    const defaultHandler = createDefaultHandler(instanceConfig);
    instanceConfig.onOpenAiDialog = defaultHandler;
    instanceConfig.onShortcutClick = defaultHandler;
  }

  editor.ui.registry.addButton('chatgptdialog', {
    icon: 'ai',
    tooltip: instanceConfig.strings.openAiDialog,
    onAction(api) {
      const content = getSelection(editor).trim() || getContent(editor);
      const messages: ChatCompletionMessageParam = [...instanceConfig.prependMessages].map((item) => ({
        ...item,
        content: item.content.replace('{context}', content)
      }));
      const selection = getSelection(editor);
      if (selection) {
        messages.push({ role: 'system', content: `Context: ${selection}` });
      }
      instanceConfig.onOpenAiDialog(editor, api, messages);
    }
  });
  editor.ui.registry.addMenuButton('openaishortcuts', {
    icon: 'ai-prompt',
    tooltip: instanceConfig.strings.openAiShortcuts,
    fetch(callback) {
      const onAction = (api: MenuItemInstanceApi, item: MenuItemSpec | NestedMenuItemSpec) => {
        const content = getSelection(editor).trim() || getContent(editor);
        const messages = [...instanceConfig.prependMessages, ...item.messages].map((item) => ({
          ...item,
          content: item.content.replace('{context}', content)
        }));
        instanceConfig.onShortcutClick(editor, api, messages);
      };
      const mapper = (shortcut) => {
        const isNested = 'shortcuts' in shortcut;
        return {
          type: isNested ? 'nestedmenuitem' : 'menuitem',
          text: shortcut.label,
          icon: shortcut.icon,
          ...(isNested
            ? { getSubmenuItems: () => shortcut.shortcuts.map(mapper) }
            : { onAction: (api) => onAction(api, shortcut) })
        };
      };
      callback(instanceConfig.shortcuts.map(mapper));
    }
  });
  editor.ui.registry.addSplitButton('openai', {
    icon: 'openai',
    tooltip: 'Open AI',
    fetch(callback) {
      const mapper = (shortcut, index, collection, parent) => {
        const hasChildren = 'shortcuts' in shortcut;
        return hasChildren
          ? shortcut.shortcuts.map((a, b, c) => mapper(a, b, c, shortcut))
          : {
              type: 'choiceitem',
              text: parent ? `${parent.label}: ${shortcut.label}` : shortcut.label,
              icon: shortcut.icon,
              value: shortcut // instanceConfig.shortcuts[index] === shortcut ? `index` : ``
            };
      };
      callback(instanceConfig.shortcuts.flatMap(mapper));
    },
    onAction(api) {
      const content = getSelection(editor).trim() || getContent(editor);
      const messages = [...instanceConfig.prependMessages].map((item) => ({
        ...item,
        content: item.content.replace('{context}', content)
      }));
      instanceConfig.onOpenAiDialog(editor, api, messages);
    },
    onItemAction(api, item) {
      const content = getSelection(editor).trim() || getContent(editor);
      const messages = [...instanceConfig.prependMessages, ...item.messages].map((item) => ({
        ...item,
        content: item.content.replace('{context}', content)
      }));
      instanceConfig.onShortcutClick(editor, api, messages);
    }
  });

  return {};
});
