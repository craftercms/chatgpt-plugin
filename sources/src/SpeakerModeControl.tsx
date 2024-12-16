import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRounded from '@mui/icons-material/VolumeOffRounded';
import { Box, Tooltip } from '@mui/material';

export interface SpeakerModeControlProps {
  speakerMode: boolean;
  onChange: () => void;
}

export default function SpeakerModeControl(props: Readonly<SpeakerModeControlProps>) {
  const { speakerMode, onChange } = props;

  return (
    <Box
      sx={{
        position: 'relative',
        top: '3px',
        marginLeft: 'auto'
      }}
    >
      <Tooltip title={speakerMode ? 'Turn off speaker mode' : 'Turn on speaker mode'}>
        {speakerMode ? (
          <VolumeUpRounded onClick={onChange} style={{ cursor: 'pointer' }} />
        ) : (
          <VolumeOffRounded onClick={onChange} style={{ cursor: 'pointer' }} />
        )}
      </Tooltip>
    </Box>
  );
}
