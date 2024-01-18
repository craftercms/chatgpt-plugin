import React, { useEffect, useRef, useState } from 'react';
import { ChatGPTProps } from './ChatGPT.tsx';
import { Editor } from 'tinymce';
import ChatGPTPopover from './ChatGPTPopover.tsx';

function Tiny() {
  const [state, setState] = useState<ChatGPTProps>(null);
  const elementRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<Editor>(null);
  useEffect(() => {
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const onOpenAiDialog = (editor, api, messages) => {
      setState({
        userName: 'Roy Art',
        initialMessages: messages,
        extraActions: [{ id: 'insert', label: 'Insert' }],
        // emptyStateOptions: [{
        //   id: 'useCasualTone',
        //   title: 'Set a casual tone for the AI content',
        //   subheader: 'e.g. Ready to chat about anything you like!',
        //   messages: [
        //     {
        //       role: 'system',
        //       content:
        //         'Answers to questions below using casual, informal language to convey a casual conversation with a real person. Acknowledge and ask the user for a prompt to begin working'
        //     }
        //   ]
        // }],
        onExtraActionClick(e, id, content, api) {
          editor.insertContent(content);
        }
      });
    };
    const onShortcutClick = (editor, api, messages) => {
      setState({
        userName: 'Roy Art',
        initialMessages: messages,
        extraActions: [{ id: 'insert', label: 'Insert' }],
        emptyStateOptions: [
          {
            id: 'useCasualTone',
            title: 'Set a casual tone for the AI content',
            subheader: 'e.g. Ready to chat about anything you like!',
            messages: [
              {
                role: 'system',
                content:
                  'Answers to questions below using casual, informal language to convey a casual conversation with a real person. Acknowledge and ask the user for a prompt to begin working'
              }
            ]
          }
        ],
        onExtraActionClick(e, id, content, api) {
          editor.insertContent(content);
        }
      });
    };
    const editor = window.tinymce.init({
      target: elementRef.current,
      theme: 'silver',
      skin: useDarkMode ? 'oxide-dark' : 'oxide',
      content_css: useDarkMode ? 'dark' : 'default',
      menubar: true,
      plugins:
        'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help',
      toolbar1:
        'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | chatgptdialog openaishortcuts openai',
      toolbar_sticky: true,
      external_plugins: {
        // acecode: 'http://localhost:8080/studio/static-assets/js/tinymce-plugins/ace/plugin.min.js',
        // editform: 'http://localhost:8080/studio/static-assets/js/tinymce-plugins/editform/plugin.js',
        // craftercms_paste_extension: 'http://localhost:8080/studio/static-assets/js/tinymce-plugins/craftercms_paste_extension/plugin.js',
        craftercms_openai: `${window.location.origin}/craftercms_openai.js`
      },
      icons: 'ai',
      icons_url: `${window.location.origin}/tinymce-icon-pack.js`,
      craftercms_openai: {
        onOpenAiDialog,
        onShortcutClick
      }
    });
    editorRef.current = editor;
  }, []);
  return (
    <>
      <textarea
        id="full-featured"
        ref={elementRef}
        defaultValue="Below are just a few of the ways you can use AI Assistant within your app. Since you can define your own custom prompts, the sky really is the limit!"
      />
      <ChatGPTPopover open={Boolean(state)} chatGPTProps={state} onClose={() => setState(null)} />
    </>
  );
}

export default Tiny;
