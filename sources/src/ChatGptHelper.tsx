import * as React from 'react';
import { useEffect, useState } from 'react';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import ChatGPTPopover, { ChatGPTPopoverProps } from './ChatGPTPopover';
import useActiveUser from '@craftercms/studio-ui/hooks/useActiveUser';
import { IconButton, Tooltip } from '@mui/material';
import OpenAI from './OpenAI';
import { getGuestToHostBus, getHostToGuestBus, getHostToHostBus } from '@craftercms/studio-ui/utils/subjects';
import { ChatGPTProps } from './ChatGPT';
import { merge } from 'rxjs';
import { chatGptClosedMessageId, chatGptResultMessageId, openChatGptMessageId } from './consts.ts';
import { createUsername } from './util.ts';
import { User } from '@craftercms/studio-ui';

/* Only want a single "Helper" instance listening, but people may use multiple helpers to put
 * the button in multiple places at once. This mechanism would leave the listening off if the
 * active listener unmounts. If this indeed becomes a problem, will revisit the mechanism. */
let helperListening = false;

export interface ChatGptHelperProps {
  ui?: 'IconButton' | 'ListItemButton' | undefined;
  enableCustomModel?: string;
}

const createChatGptPopoverProps = (user: User, other?: Partial<ChatGPTPopoverProps>): Partial<ChatGPTPopoverProps> => {
  const onExtraActionClick: ChatGPTProps['onExtraActionClick'] = (e, id, content, api) =>
    getHostToGuestBus().next({ type: chatGptResultMessageId, payload: { id, content } });
  return {
    ...other,
    chatGPTProps: { ...other?.chatGPTProps, userName: createUsername(user), onExtraActionClick }
  };
};

export function ChatGptHelper(props: Readonly<ChatGptHelperProps>) {
  const { ui, enableCustomModel = 'true' } = props;
  const user = useActiveUser();
  const [open, setOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatGPTPopoverProps, setChatGPTPopoverProps] = useState<Partial<ChatGPTPopoverProps>>(() =>
    createChatGptPopoverProps(user)
  );
  const handleOpenButtonClick = () => {
    setOpen(true);
    setIsMinimized(false);
  };
  const handleClose = () => {
    getHostToGuestBus().next({ type: chatGptClosedMessageId });
    setOpen(false);
    setChatGPTPopoverProps(createChatGptPopoverProps(user));
  };
  useEffect(() => {
    if (!helperListening) {
      helperListening = true;
      const subscription = merge(getGuestToHostBus(), getHostToHostBus()).subscribe((message) => {
        if (message.type === openChatGptMessageId) {
          setChatGPTPopoverProps(createChatGptPopoverProps(user, message.payload));
          setOpen(true);
          setIsMinimized(false);
        }
      });
      return () => {
        helperListening = false;
        subscription.unsubscribe();
      };
    }
  }, [user]);
  return (
    <>
      {Boolean(ui) &&
        (ui === 'IconButton' ? (
          <Tooltip title="Chat GPT">
            <IconButton onClick={handleOpenButtonClick}>
              <OpenAI />
            </IconButton>
          </Tooltip>
        ) : (
          <ToolsPanelListItemButton
            icon={{ id: 'craftercms.components.openai.OpenAILogo' }}
            title="Chat GPT"
            onClick={handleOpenButtonClick}
          />
        ))}
      <ChatGPTPopover
        {...chatGPTPopoverProps}
        enableCustomModel={enableCustomModel.toLowerCase() === 'true'}
        open={open}
        onClose={handleClose}
        isMinimized={isMinimized}
        onMinimize={() => setIsMinimized(true)}
        onMaximize={() => setIsMinimized(false)}
      />
    </>
  );
}

export default ChatGptHelper;
