import {
  AppBar,
  AppBarProps,
  Backdrop,
  IconButton,
  paperClasses,
  Popover,
  PopoverProps,
  Typography
} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ChatGPT, { ChatGPTProps } from './ChatGPT.tsx';
import React from 'react';

export interface ChatGPTPopoverProps extends PopoverProps {
  appBarTitle?: string;
  width?: number | string;
  height?: number | string;
  appBarProps?: AppBarProps;
  chatGPTProps: ChatGPTProps;
}

function ChatGPTPopover(props: ChatGPTPopoverProps) {
  const {
    open,
    onClose,
    appBarProps,
    chatGPTProps,
    appBarTitle = 'AI Assistant',
    width = 450,
    height = 500,
    ...popoverProps
  } = props;
  return (
    <Popover
      open={open}
      onClose={onClose}
      keepMounted={false}
      anchorReference="none"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      anchorPosition={{ top: 100, left: 100 }}
      BackdropProps={{ invisible: false, sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
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
      <AppBar
        position="static"
        {...appBarProps}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          placeContent: 'space-between',
          alignItems: 'center',
          pl: 2,
          pr: 1,
          py: 1,
          ...appBarProps?.sx
        }}
      >
        <Typography variant="h6" color="inherit" component="div" children={appBarTitle} />
        <IconButton color="inherit" aria-label="close" onClick={(e) => onClose?.(e, 'closeButton' as 'backdropClick')}>
          <CloseRounded />
        </IconButton>
      </AppBar>
      <ChatGPT {...chatGPTProps} sxs={{ root: { height: 'calc(100% - 56px)' }, ...chatGPTProps?.sxs }} />
    </Popover>
  );
}

export default ChatGPTPopover;
