import ImageRounded from '@mui/icons-material/ImageRounded';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import OpenAILogo from './OpenAI';

export default function ChatGptSideBar(props) {
  const { mode, onModeSelected } = props;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 42,
        marginTop: '-1px',
        [`& .MuiDrawer-paper`]: {
          width: 42,
          position: 'relative'
        }
      }}
    >
      <div>
        <IconButton
          color={mode === 'chat' ? 'primary' : 'default'}
          onClick={() => {
            onModeSelected?.('chat');
          }}
        >
          <Tooltip title="Chat Completion" arrow>
            <OpenAILogo />
          </Tooltip>
        </IconButton>
        <IconButton
          color={mode === 'image' ? 'primary' : 'default'}
          onClick={() => {
            onModeSelected?.('image');
          }}
        >
          <Tooltip title="Image Generation" arrow>
            <ImageRounded />
          </Tooltip>
        </IconButton>
      </div>
    </Drawer>
  );
}
