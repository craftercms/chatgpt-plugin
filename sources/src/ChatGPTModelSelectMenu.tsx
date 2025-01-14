import React from 'react';
import { Button, CircularProgress, FormControlLabel, Menu, MenuItem, Radio } from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

export interface ChatGPTModelSelectMenuProps {
  models: Array<{ id: string }>;
  enableCustomModel: boolean;
  handleModelMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  modelMenuAnchorEl: null | HTMLElement;
  selectedModel: string;
  handleModelSelect: (modelId: string) => void;
  handleClose: () => void;
}

export default function ChatGPTModelSelectMenu({
  models,
  enableCustomModel,
  handleModelMenuClick,
  modelMenuAnchorEl,
  selectedModel,
  handleModelSelect,
  handleClose
}: Readonly<ChatGPTModelSelectMenuProps>) {
  return (
    <>
      <Button
        id="model-select-button"
        variant="text"
        color="inherit"
        onClick={enableCustomModel ? handleModelMenuClick : undefined}
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
