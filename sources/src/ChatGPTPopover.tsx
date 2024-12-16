import { AppBarProps, Box, paperClasses, Popover, PopoverProps, useTheme } from '@mui/material';
import ChatGPT, { ChatGPTProps, ChatGPTRef, ChatMode } from './ChatGPT.tsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MinimizedBar from '@craftercms/studio-ui/components/MinimizedBar';
import DialogHeader from '@craftercms/studio-ui/components/DialogHeader/DialogHeader';
import AlertDialog from '@craftercms/studio-ui/components/AlertDialog';
import PrimaryButton from '@craftercms/studio-ui/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@craftercms/studio-ui/components/SecondaryButton/SecondaryButton';
import { listChatModels } from './util.ts';
import {
  chatGptEmptyStateOptionsChat,
  defaultChatModel,
  defaultImageModel,
  emptyStateOptionsGenerateImages
} from './consts.ts';
import ChatGPTModelSelectMenu from './ChatGPTModelSelectMenu.tsx';
import SpeakerModeControl from './SpeakerModeControl.tsx';

export interface ChatGPTPopoverProps extends PopoverProps {
  appBarTitle?: string;
  width?: number | string;
  height?: number | string;
  appBarProps?: AppBarProps;
  chatGPTProps?: ChatGPTProps;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  enableCustomModel?: boolean;
}

function ChatGPTPopover(props: Readonly<ChatGPTPopoverProps>) {
  const theme = useTheme();
  const {
    open,
    onClose,
    chatGPTProps,
    isMinimized = false,
    onMinimize,
    onMaximize,
    appBarTitle = 'AI Assistant',
    width = 492,
    height = 595,
    enableCustomModel = true,
    ...popoverProps
  } = props;

  const chatGptRef = useRef<ChatGPTRef>(null);
  const [speakerMode, setSpeakerMode] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [modelMenuAnchorEl, setModelMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedModel, setSelectedModel] = useState(defaultChatModel);
  const [selectedMode, setSelectedMode] = useState<ChatMode>('chat');
  const [allModels, setAllModels] = useState<Array<{ id: string }>>([]);

  useEffect(() => {
    listChatModels().then((modelList) => {
      setAllModels(modelList);
    });
  }, []);

  const filteredModels = useMemo(() => {
    return allModels.filter((model) => {
      if (selectedMode === 'chat') {
        return model.id.includes('gpt-3.5') || model.id.includes('gpt-4');
      } else if (selectedMode === 'image') {
        return model.id.includes('dall-e');
      }
      return false;
    });
  }, [allModels, selectedMode]);

  const handleModelMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setModelMenuAnchorEl(modelMenuAnchorEl ? null : event.currentTarget);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    handleClose();
  };

  const handleClose = () => {
    setModelMenuAnchorEl(null);
  };

  return (
    <>
      <Popover
        open={open && !isMinimized}
        onClose={(e, reason) => {
          if (chatGptRef.current?.hasConversation()) {
            // setOpenAlertDialog(true);
            onMinimize?.();
          } else {
            onClose(e, reason);
          }
        }}
        keepMounted={isMinimized}
        anchorReference="none"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        anchorPosition={{ top: 100, left: 100 }}
        BackdropProps={{
          invisible: false,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
        {...popoverProps}
        sx={{
          [`> .${paperClasses.root}`]: {
            width,
            height,
            display: 'flex',
            flexDirection: 'column',
            bottom: 10,
            right: 10
          },
          ...popoverProps?.sx
        }}
      >
        <DialogHeader
          title={appBarTitle}
          sxs={{
            root: { boxShadow: theme.shadows[4], borderBottom: 'none' },
            subtitleWrapper: {
              width: '100%'
            }
          }}
          onMinimizeButtonClick={() => onMinimize?.()}
          onCloseButtonClick={(e) => onClose(e, null)}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChatGPTModelSelectMenu
              models={filteredModels}
              enableCustomModel={enableCustomModel}
              handleModelMenuClick={handleModelMenuClick}
              modelMenuAnchorEl={modelMenuAnchorEl}
              selectedModel={selectedModel}
              handleModelSelect={handleModelSelect}
              handleClose={handleClose}
            />
            {selectedMode === 'chat' && (
              <SpeakerModeControl
                speakerMode={speakerMode}
                onChange={() => {
                  window.speechSynthesis.cancel();
                  setSpeakerMode((prev) => !prev);
                }}
              />
            )}
          </Box>
        </DialogHeader>
        <ChatGPT
          {...chatGPTProps}
          ref={chatGptRef}
          model={selectedModel}
          speakerMode={speakerMode}
          sxs={{
            root: { height: 'calc(100% - 113px)' },
            chat: { height: 'calc(100% - 97px)' },
            ...chatGPTProps?.sxs
          }}
          onModeSelected={(mode) => {
            if (mode === 'chat') {
              setSelectedModel(defaultChatModel);
            } else if (mode === 'image') {
              setSelectedModel(defaultImageModel);
            }
            setSelectedMode(mode);
          }}
          emptyStateOptions={selectedMode === 'image' ? emptyStateOptionsGenerateImages : chatGptEmptyStateOptionsChat}
        />
      </Popover>
      <MinimizedBar open={isMinimized} onMaximize={onMaximize} title={appBarTitle} />
      <AlertDialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openAlertDialog}
        title="Close this chat?"
        body="The current conversation will be lost."
        buttons={
          <>
            <PrimaryButton
              onClick={(e) => {
                setOpenAlertDialog(false);
                onClose(e, null);
              }}
              autoFocus
              fullWidth
              size="large"
            >
              Close
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                setOpenAlertDialog(false);
                onMinimize?.();
              }}
              fullWidth
              size="large"
            >
              Minimize
            </SecondaryButton>
            <SecondaryButton onClick={() => setOpenAlertDialog(false)} fullWidth size="large">
              Cancel
            </SecondaryButton>
          </>
        }
      />
    </>
  );
}

export default ChatGPTPopover;
