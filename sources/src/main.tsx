import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Box, createTheme, IconButton, InputAdornment, TextField, Tooltip, useMediaQuery } from '@mui/material';
import Tiny from './Tiny.tsx';
import OpenAILogo from './OpenAI';
import ChatGPTPromptPopover from './ChatGPTPromptPopover';
import GlobalStyles from '@craftercms/studio-ui/components/GlobalStyles';
import CrafterThemeProvider from '@craftercms/studio-ui/components/CrafterThemeProvider';
import I18nProvider from '@craftercms/studio-ui/components/I18nProvider';

function AppWrap() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => {
    const mode = prefersDarkMode ? 'dark' : 'light';
    return createTheme({
      palette: { mode },
      components: {
        MuiButton: { styleOverrides: { root: { textTransform: 'none' } } }
      }
    });
  }, [prefersDarkMode]);
  const [value, setValue] = useState('Skydiving risks');
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <CrafterThemeProvider themeOptions={theme}>
      <I18nProvider>
        <Box sx={{ p: 5 }}>
          <TextField
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Send message">
                    <IconButton onClick={(e) => setAnchorEl(e.target)}>
                      <OpenAILogo />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
          <ChatGPTPromptPopover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            context={value}
            onClose={() => setAnchorEl(null)}
            print={(content) => setValue(content)}
          />
          <Tiny />
          <GlobalStyles cssBaseline={true} />
        </Box>
      </I18nProvider>
    </CrafterThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrap />
  </React.StrictMode>
);
