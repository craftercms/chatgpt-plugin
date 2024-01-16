import { PluginDescriptor } from '@craftercms/studio-ui';
import ChatGPTPopover from './src/ChatGPTPopover';
import ChatGPT from './src/ChatGPT';
import OpenAI from './src/OpenAI';
import ChatGptHelper from './src/ChatGptHelper';
import { chatWidgetId, helperWidgetId, logoWidgetId, popoverWidgetId } from './src/consts.ts';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'craftercms.openai',
  widgets: {
    [helperWidgetId]: ChatGptHelper,
    [logoWidgetId]: OpenAI,
    [chatWidgetId]: ChatGPT,
    [popoverWidgetId]: ChatGPTPopover
  }
};

export { ChatGPT, ChatGPTPopover };

export default plugin;
