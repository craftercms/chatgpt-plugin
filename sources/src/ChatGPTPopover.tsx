import {
  AppBar,
  AppBarProps,
  IconButton,
  paperClasses,
  Popover,
  PopoverProps,
  Popper,
  Typography
} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import RemoveRounded from '@mui/icons-material/RemoveRounded';
import OpenInBrowserRounded from '@mui/icons-material/OpenInBrowserRounded';
import ChatGPT, { ChatGPTProps } from './ChatGPT.tsx';
import React, { ReactNode, useCallback, useEffect } from 'react';

interface ChatGPTAppBarProps extends AppBarProps {
  children: ReactNode;
}

function ChatGPTAppBar({ children, ...appBarProps }: Readonly<ChatGPTAppBarProps>) {
  return (
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
      {children}
    </AppBar>
  );
}

export interface ChatGPTPopoverProps extends PopoverProps {
  appBarTitle?: string;
  width?: number | string;
  height?: number | string;
  appBarProps?: AppBarProps;
  chatGPTProps?: ChatGPTProps;
  isMinimized?: boolean;
  onMinimize?: () => void;
}

function ChatGPTPopover(props: Readonly<ChatGPTPopoverProps>) {
  const {
    open,
    onClose,
    appBarProps,
    chatGPTProps,
    isMinimized = false,
    onMinimize,
    appBarTitle = 'AI Assistant',
    width = 450,
    height = 500,
    ...popoverProps
  } = props;

  const handleMinimize = useCallback(() => {
    onMinimize?.();
  }, [onMinimize]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isMinimized) {
        handleMinimize();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, isMinimized, handleMinimize]);

  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        disableEscapeKeyDown={true}
        keepMounted={false}
        anchorReference="none"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        anchorPosition={{ top: 100, left: 100 }}
        BackdropProps={{
          invisible: false,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          onClick: (event) => {
            event.stopPropagation();
            handleMinimize();
          }
        }}
        {...popoverProps}
        sx={{
          visibility: isMinimized ? 'hidden' : 'visible',
          [`> .${paperClasses.root}`]: {
            width,
            height,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 10,
            right: 10
          },
          ...popoverProps?.sx
        }}
      >
        <ChatGPTAppBar {...appBarProps}>
          <Typography variant="h6" color="inherit" component="div">{appBarTitle}</Typography>
          <div>
            <IconButton color="inherit" aria-label="minimize" onClick={handleMinimize}>
              <RemoveRounded />
            </IconButton>
            <IconButton color="inherit" aria-label="close" onClick={(e) => onClose?.(e, 'closeButton' as 'backdropClick')}>
              <CloseRounded />
            </IconButton>
          </div>
        </ChatGPTAppBar>
      <ChatGPT {...chatGPTProps} sxs={{ root: { height: 'calc(100% - 56px)' }, ...chatGPTProps?.sxs }} />
      </Popover>
      <Popper
        open={isMinimized}
        anchorEl={() => document.body}
        modifiers={[
          {
            name: 'applyStyles',
            enabled: true,
            fn: ({ state }) => {
              Object.assign(state.elements.popper.style, {
                zIndex: 1300,
                position: 'absolute',
                transform: 'none',
                inset: 'auto',
                bottom: '10px',
                right: '10px'
              });
            },
          },
        ]}
        sx={{
          [`> .${paperClasses.root}`]: {
            width: 250,
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            right: 10,
            padding: '16px 20px'
          },
        }}
      >
        <ChatGPTAppBar {...appBarProps}>
          <Typography variant="h6" color="inherit" component="div">{appBarTitle}</Typography>
            <div>
              <IconButton color="inherit" onClick={handleMinimize} aria-label="expand">
                <OpenInBrowserRounded />
              </IconButton>
            </div>
        </ChatGPTAppBar>
      </Popper>
    </>
  );
}

export default ChatGPTPopover;
