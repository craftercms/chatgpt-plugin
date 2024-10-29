import { AppBarProps, paperClasses, Popover, PopoverProps, useTheme } from '@mui/material';
import ChatGPT, { ChatGPTProps } from './ChatGPT.tsx';
import React, { useState } from 'react';
import MinimizedBar from '@craftercms/studio-ui/components/MinimizedBar';
import DialogHeader from '@craftercms/studio-ui/components/DialogHeader/DialogHeader';
import AlertDialog from '@craftercms/studio-ui/components/AlertDialog';
import PrimaryButton from '@craftercms/studio-ui/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@craftercms/studio-ui/components/SecondaryButton/SecondaryButton';

export interface ChatGPTPopoverProps extends PopoverProps {
  appBarTitle?: string;
  width?: number | string;
  height?: number | string;
  appBarProps?: AppBarProps;
  chatGPTProps?: ChatGPTProps;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
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
    width = 450,
    height = 500,
    ...popoverProps
  } = props;

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const handleMinimize = () => {
    onMinimize?.();
  };

  return (
    <>
      <Popover
        open={open && !isMinimized}
        onClose={() => setOpenAlertDialog(true)}
        disableEscapeKeyDown={true}
        keepMounted={isMinimized}
        anchorReference="none"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        anchorPosition={{ top: 100, left: 100 }}
        BackdropProps={{
          invisible: false,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          onClick: (event) => {
            event.stopPropagation();
            setOpenAlertDialog(true);
          }
        }}
        {...popoverProps}
        sx={{
          zIndex: theme.zIndex.modal + 1,
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
          sxs={{ root: { boxShadow: theme.shadows[4], borderBottom: 'none' } }}
          onMinimizeButtonClick={handleMinimize}
          onCloseButtonClick={(e) => onClose(e, null)}
        />
        <ChatGPT {...chatGPTProps} sxs={{ root: { height: 'calc(100% - 56px)' }, ...chatGPTProps?.sxs }} />
      </Popover>
      <MinimizedBar open={isMinimized} onMaximize={onMaximize} title={appBarTitle} />
      <AlertDialog
        sxs={{
          root: {
            zIndex: theme.zIndex.modal + 2
          }
        }}
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
                handleMinimize();
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
