import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  InputAdornment,
  Paper,
  styled,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import OpenAILogo from './OpenAI';
import SendIcon from '@mui/icons-material/SendRounded';
import { ChatCompletionMessageParam, ChatCompletionChunk } from 'openai/resources/chat/index';
import { SxProps } from '@mui/system/styleFunctionSx';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import ContentPasteRounded from '@mui/icons-material/ContentPasteRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import MicRounded from '@mui/icons-material/MicRounded';
import { Stream } from 'openai/streaming';
import { ChatCompletionCreateParamsBase } from 'openai/src/resources/chat/completions.ts';
import { createChatCompletion } from './util';
import { defaultModel } from './consts';

const StyledBox = styled(Box)(
  // language=CSS
  ({ theme }) => `
  max-width: 100%;
  margin: 0;
  font-family: ${theme.typography.fontFamily};
  display: flex;
  /*background-color: ${theme.palette.background.paper};*/
  padding: ${theme.spacing(2)};`
);

const StyledPre = styled('pre')(
  // language=CSS
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  margin: 10px 0 0;
  max-width: 100%;
  white-space: pre-wrap;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize};
  font-weight: ${theme.typography.fontWeightRegular};
  flex: 1;`
);

const StyledAvatar = styled(Avatar)(
  // language=CSS
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
    flexShrink: 0;
  `
);

const StyledIframe = styled('iframe')(
  // language=CSS
  () => `
    width: 100%;
    background-color: transparent;
    border: none;
  `
);

function createSrcDoc(html: string, theme: Theme) {
  return `<!DOCTYPE html>
  <html>
  <head>
  <meta name="color-scheme" content="${theme.palette.mode}">
  <script>
  document.addEventListener("click", function (e) {
    for (var elm = e.target; elm; elm = elm.parentNode) {
      if (elm.nodeName === "A" && !(e.metaKey || (e.ctrlKey && !e.altKey))) {
        e.preventDefault();
      }
    }
  }, false);
  </script>
  <style>
  * { box-sizing: border-box }
  html, body {
    margin: 0;
    padding: 0;
    background-color: transparent!important;
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize}px;
    color: ${theme.palette.text.primary};
    width: 100%;
    height: fit-content;
    overflow: hidden;
  }
  body { border: solid transparent }
  p { margin: 10px 0; }
  body > :last-child { margin-bottom: 0 }
  </style>
  </head>
  <body>${html}</body>
  </html>`;
}

function copyToClipboard(textToCopy: string): Promise<void> {
  // Clipboard is only available on user-initiated callbacks over non-secure contexts (e.g. not https).
  return (
    navigator.clipboard?.writeText(textToCopy) ??
    Promise.reject(new Error('Copying to clipboard is only available in secure contexts or user-initiated callbacks.'))
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function nameToInitials(name: string) {
  const parts = name.split(' ');
  const initials = parts.map((part) => part.charAt(0).toUpperCase());
  return initials.join('');
}

export interface ClickApi {
  focusInput(start?: number, end?: number): void;
  setPrompt(prompt: string): void;
  pushMessages(messages: ChatCompletionMessageParam[]): void;
}

export interface EmptyStateOption {
  id: string;
  title: string;
  subheader?: string;
  messages?: Array<ChatCompletionMessageParam>;
  prompt?: string;
}

export interface SpeechRecognitionWindow extends Window {
  webkitSpeechRecognition: typeof SpeechRecognition;
}

export interface ChatGPTProps {
  userName: string;
  model?: ChatCompletionCreateParamsBase['model'];
  sxs?: Partial<Record<'root' | 'messages' | 'form', SxProps<Theme>>>;
  scrollToReply?: boolean;
  emptyStateOptions?: Array<EmptyStateOption>;
  onEmptyStateOptionClick?: (e: React.MouseEvent, option: EmptyStateOption, api: ClickApi) => void;
  extraActions?: Array<{
    icon?: React.ReactNode;
    label?: string;
    id: string;
  }>;
  onExtraActionClick?: (e: React.MouseEvent, id: string, content: string, api: ClickApi) => void;
  initialMessages?: Array<ChatCompletionMessageParam>;
  aiAvatarColour?: string;
}

export interface ChatGPTRef {
  hasConversation: () => boolean;
}

const ChatGPT = forwardRef<ChatGPTRef, ChatGPTProps>((props, ref) => {
  // region const { ... } = props;
  const {
    sxs,
    model = defaultModel,
    userName,
    scrollToReply = true,
    initialMessages,
    aiAvatarColour = '#19c37d',
    extraActions,
    emptyStateOptions = [
      {
        id: 'useCasualTone',
        title: 'Set a casual tone for the AI content',
        subheader: 'e.g. Ready to chat about anything you like!',
        messages: [
          {
            role: 'system',
            content:
              'Answer upcoming questions using casual, informal language to convey a casual conversation with a real person. Confirm and ask the user for a prompt to begin working'
          }
        ]
      },
      {
        id: 'useProfessionalTone',
        title: 'Set a formal tone for the AI content',
        subheader: 'e.g. How may I be of assistance to you today?',
        messages: [
          {
            role: 'system',
            content:
              'Answers upcoming questions using polished, formal, and respectful language to convey professional expertise and competence. Acknowledge and ask the user for a prompt to begin working'
          }
        ]
      },
      {
        id: 'generateTitle',
        title: 'Suggest title for your content',
        prompt: 'Suggest a title for an article. Topic: '
      },
      {
        id: 'generateBody',
        title: 'Generate a body for your an article',
        prompt: 'Write the body for an article. Topic: '
      }
    ],
    onExtraActionClick,
    onEmptyStateOptionClick = (e, option, api) => {
      if (option?.prompt) {
        const len = option.prompt.length;
        api.setPrompt(option.prompt);
        api.focusInput(len, len);
      } else if (option?.messages) {
        api.pushMessages(option.messages);
      }
    }
  } = props;
  // endregion
  const [streaming, setStreaming] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<Error>();
  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>(
    initialMessages ??
      [
        //   { role: 'user', content: 'Generate 1 paragraph of placeholder text.' }
        //   { role: 'user', content: 'Greetings.' },
        //   { role: 'assistant', content: 'Hi! How can I assist you today?' },
        //   { role: 'user', content: 'What\'s the best time to drink coffee?' },
        //   { role: 'assistant', content: 'The best time to drink coffee is typically in the morning between 9:30 am to 11:30 am when your cortisol levels are starting to drop. However, if you have it straight after waking up, your body\'s production of cortisol (a stress hormone and also a natural mechanism which helps you stay awake) could be hindered. Coffee can also be consumed in the early afternoon, around 1:00 pm to 2:00 pm. Keep in mind that this can vary depending on your own personal body clock. It\'s also important not to consume coffee too close to bedtime, as caffeine can interfere with your ability to fall asleep.' }
      ]
  );
  const hasConversationRef = useRef<boolean>(false);
  const messagesRef = useRef<Array<ChatCompletionMessageParam>>(messages);
  const streamRef = useRef<Stream<ChatCompletionChunk>>();
  const mountedOnceRef = useRef<boolean>(false); // Pretty much for React's Strict dev mode double mounting.
  const inputRef = useRef<HTMLInputElement>();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const userColour = stringToColor(userName);
  const maxMessageIndex = messages.length - 1;
  const srcDoc = messages.length ? createSrcDoc('...', theme) : '';

  const submit = async () => {
    abortStream();
    setError(null);
    setStreaming(true);
    setMessages([...messagesRef.current, { role: 'assistant', content: '...' }]);
    const chunks = [];
    try {
      const stream = (streamRef.current = await createChatCompletion({
        model,
        messages: messagesRef.current,
        stream: true
      }));
      const reply: ChatCompletionMessageParam = { role: 'assistant', content: '' };
      messagesRef.current.push(reply);
      setMessages([...messagesRef.current]);
      for await (const part of stream) {
        const content = part.choices[0]?.delta?.content;
        if (content) {
          reply.content += content;
          setMessages([...messagesRef.current]);
          chunks.push(content);
        }
      }
    } catch (e) {
      setMessages(messagesRef.current);
      setError(e);
      console.error(e);
    }
    setStreaming(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const abortStream = () => {
    stopVoiceInput();
    streamRef.current?.controller.abort('Cancelled');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setPrompt('');
    messagesRef.current.push({ role: 'user', content: prompt });
    await submit();
  };

  const api = {
    focusInput(start = 0, end = 0) {
      const input = inputRef.current;
      if (input) {
        input.focus();
        if (start != null && end != null) {
          setTimeout(() => {
            input.setSelectionRange(start, end);
          });
        }
      }
    },
    setPrompt(prompt: string) {
      setPrompt(prompt);
    },
    pushMessages(messages: ChatCompletionMessageParam[]) {
      messagesRef.current.push(...messages);
      setMessages([...messagesRef.current]);
      submit();
    }
  };

  useEffect(() => {
    if (!mountedOnceRef.current) {
      mountedOnceRef.current = true;
      (async () => await (messages.some(({ role }) => role === 'user') ? submit() : Promise.resolve()))();
      return () => abortStream();
    }
  }, []);

  useEffect(() => {
    hasConversationRef.current = messages.length > (initialMessages?.length ?? 0) || prompt.length > 0;
  }, [messages, initialMessages, prompt]);

  useImperativeHandle(ref, () => ({
    hasConversation: () => hasConversationRef.current
  }));

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new (window as SpeechRecognitionWindow).webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStreaming(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };

    recognition.onend = () => {
      setStreaming(false);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      setStreaming(false);
    };

    recognition.start();
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ...sxs?.root }}>
      <Box sx={{ overflow: 'auto', flex: '1', '*': { boxSizing: 'border-box' }, ...sxs?.messages }}>
        {messages.filter((msg) => msg.role !== 'system').length === 0 && (
          <Box sx={{ width: '100%', p: 2 }}>
            <Paper
              sx={{ maxWidth: '400px', p: 2, mr: 'auto', ml: 'auto', textAlign: 'center', background: 'transparent' }}
              elevation={0}
            >
              <OpenAILogo />
              <Typography variant="h6">Generative AI Assistant</Typography>
            </Paper>
            <Box
              sx={{
                mx: 'auto',
                display: 'grid',
                maxWidth: '700px',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '16px',
                rowGap: '16px'
              }}
            >
              {emptyStateOptions.map((option) => (
                <Card key={option.id}>
                  <CardActionArea onClick={(e) => onEmptyStateOptionClick(e, option, api)}>
                    <CardHeader
                      title={option.title}
                      subheader={option.subheader}
                      titleTypographyProps={{ variant: 'body1' }}
                      subheaderTypographyProps={{ variant: 'body2' }}
                    />
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        )}
        {messages.map(({ role, content }, index) =>
          role === 'system' ? null : (
            <Box sx={{ bgcolor: role === 'assistant' ? (isDark ? 'grey.900' : 'grey.100') : undefined }} key={index}>
              <StyledBox>
                <StyledAvatar
                  variant="rounded"
                  sx={
                    role === 'assistant'
                      ? { backgroundColor: aiAvatarColour, color: theme.palette.getContrastText(aiAvatarColour) }
                      : { backgroundColor: userColour, color: theme.palette.getContrastText(userColour) }
                  }
                >
                  {role === 'assistant' ? <OpenAILogo /> : nameToInitials(userName)}
                </StyledAvatar>
                {role === 'assistant' ? (
                  <StyledIframe
                    style={{ height: 30 }}
                    srcDoc={srcDoc}
                    ref={(node) => {
                      if (node?.contentWindow?.document?.documentElement) {
                        node.contentWindow.document.body.innerHTML = content;
                        node.style.height = `${node.contentWindow.document.body.scrollHeight + 5}px`;
                      }
                    }}
                  />
                ) : (
                  <StyledPre>{content}</StyledPre>
                )}
                {role === 'assistant' && (
                  <Box>
                    {streaming && index === maxMessageIndex ? (
                      <Tooltip title="Stop/abort">
                        <IconButton size="small" onClick={abortStream}>
                          <StopRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Copy to clipboard">
                        <IconButton size="small" onClick={() => copyToClipboard(content)}>
                          <ContentPasteRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                )}
              </StyledBox>
              {!streaming && maxMessageIndex === index && role === 'assistant' && extraActions?.length && (
                <Box sx={{ px: 1, pb: 1, display: 'flex', justifyContent: 'right' }}>
                  {extraActions.map(({ label, id }) => (
                    <Button
                      key={id}
                      variant="text"
                      size="small"
                      onClick={(e) => onExtraActionClick?.(e, id, content, api)}
                    >
                      {label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          )
        )}
        {error && <Alert severity="error">{error.message}</Alert>}
        {scrollToReply && <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'end' })} />}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          pr: 1,
          display: 'flex',
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center',
          bgcolor: 'background.paper',
          boxShadow: 1,
          ...sxs?.form
        }}
      >
        <TextField
          id="chat-gpt-input"
          autoFocus
          fullWidth
          inputRef={inputRef}
          disabled={streaming}
          label="Type or click the mic to talk"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {streaming ? (
                  <Tooltip title="Stop/abort">
                    <IconButton size="small" onClick={abortStream}>
                      <StopRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Click to talk">
                      <IconButton
                        size="small"
                        onMouseDown={startVoiceInput}
                        onTouchStart={startVoiceInput}
                      >
                        <MicRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send message">
                    <IconButton type="submit" disabled={streaming} onClick={handleSubmit}>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                  </>
                )}
              </InputAdornment>
            )
          }}
        />
        {/*
        TODO: Add menu for settings, etc.
        <IconButton sx={{ ml: 1 }}>
          <MoreVertRounded />
        </IconButton>
        */}
      </Box>
    </Box>
  );
});

export default ChatGPT;
