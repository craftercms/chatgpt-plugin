import { useEffect, useState } from 'react';
import { Box, FormControl, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import InfoRounded from '@mui/icons-material/InfoRounded';

export interface ImageSizeSelectionProps {
  size: string;
  model: string;
  onChange: (value: string) => void;
}

export default function ImageSizeSelection(props: Readonly<ImageSizeSelectionProps>) {
  const { model, size, onChange } = props;
  const [possibleSizes, setPossibleSizes] = useState([]);

  useEffect(() => {
    if (model === 'dall-e-3') {
      setPossibleSizes(['1024x1024', '1792x1024', '1024x1792']);
    } else if (model === 'dall-e-2') {
      setPossibleSizes(['256x256', '512x512', '1024x1024']);
    } else {
      setPossibleSizes([]);
    }
  }, [model]);

  return (
    <Box
      sx={{
        position: 'relative',
        top: '3px',
        marginLeft: 'auto',
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      <FormControl variant="standard" sx={{ m: 0 }}>
        <Select
          labelId="image-size-selector"
          value={size}
          onChange={(e) => onChange?.(e.target.value)}
          sx={{
            cursor: 'pointer',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        >
          {possibleSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title={<Typography>Select an image size.</Typography>} arrow>
        <InfoRounded />
      </Tooltip>
    </Box>
  );
}
