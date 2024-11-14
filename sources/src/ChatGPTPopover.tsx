import {
  AppBarProps,
  Button,
  CircularProgress,
  FormControlLabel,
  Menu,
  MenuItem,
  paperClasses,
  Popover,
  PopoverProps,
  Radio,
  Theme,
  useTheme
} from '@mui/material';
import ChatGPT, { ChatGPTProps, ChatGPTRef } from './ChatGPT.tsx';
import React, { useEffect, useRef, useState } from 'react';
import MinimizedBar from '@craftercms/studio-ui/components/MinimizedBar';
import DialogHeader from '@craftercms/studio-ui/components/DialogHeader/DialogHeader';
import AlertDialog from '@craftercms/studio-ui/components/AlertDialog';
import PrimaryButton from '@craftercms/studio-ui/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@craftercms/studio-ui/components/SecondaryButton/SecondaryButton';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { listChatModels } from './util.ts';
import { defaultModel } from './consts.ts';

interface ChatGPTModelSelectProps {
  enableCustomModel: boolean;
  handleSettingsClick: (event: React.MouseEvent<HTMLElement>) => void;
  modelMenuAnchorEl: null | HTMLElement;
  selectedModel: string;
  handleModelSelect: (modelId: string) => void;
  handleClose: () => void;
  theme?: Theme;
}

function ChatGPTModelSelect({
  enableCustomModel,
  handleSettingsClick,
  modelMenuAnchorEl,
  selectedModel,
  handleModelSelect,
  handleClose,
  theme
}: Readonly<ChatGPTModelSelectProps>) {
  const [models, setModels] = useState<Array<{ id: string }>>([]);
  useEffect(() => {
    listChatModels().then((modelList) => {
      setModels(modelList);
    });
  }, []);
  return (
    <>
      <Button
        id="model-select-button"
        variant="text"
        color="inherit"
        onClick={enableCustomModel ? handleSettingsClick : undefined}
        aria-controls={modelMenuAnchorEl ? 'model-select-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(modelMenuAnchorEl)}
        sx={{
          typography: 'subtitle1',
          textTransform: 'none',
          borderRadius: 1,
          minWidth: 0
        }}
        endIcon={enableCustomModel ? <ExpandMoreRounded /> : null}
      >
        {selectedModel}
      </Button>
      {enableCustomModel && (
        <Menu
          id="model-select-menu"
          anchorEl={modelMenuAnchorEl}
          open={Boolean(modelMenuAnchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'model-select-button'
          }}
        >
          {models && models.length > 0 ? (
            models.map((model) => (
              <MenuItem key={model.id} onClick={() => handleModelSelect(model.id)}>
                <FormControlLabel control={<Radio checked={selectedModel === model.id} />} label={model.id} />
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <CircularProgress size={16} />
            </MenuItem>
          )}
        </Menu>
      )}
    </>
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
    width = 450,
    height = 544,
    enableCustomModel = true,
    ...popoverProps
  } = props;

  const chatGptRef = useRef<ChatGPTRef>(null);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [modelMenuAnchorEl, setModelMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedModel, setSelectedModel] = useState(defaultModel);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
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
            setOpenAlertDialog(true);
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
          sxs={{ root: { boxShadow: theme.shadows[4], borderBottom: 'none' } }}
          onMinimizeButtonClick={() => onMinimize?.()}
          onCloseButtonClick={(e) => onClose(e, null)}
        >
          <ChatGPTModelSelect
            enableCustomModel={enableCustomModel}
            handleSettingsClick={handleSettingsClick}
            modelMenuAnchorEl={modelMenuAnchorEl}
            selectedModel={selectedModel}
            handleModelSelect={handleModelSelect}
            handleClose={handleClose}
            theme={theme}
          />
        </DialogHeader>
        <ChatGPT
          {...chatGPTProps}
          ref={chatGptRef}
          model={selectedModel}
          sxs={{ root: { height: 'calc(100% - 112px)' }, ...chatGPTProps?.sxs }}
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
