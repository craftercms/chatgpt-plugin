import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CircularProgress,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
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
import DownloadRouned from '@mui/icons-material/DownloadRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import MicRounded from '@mui/icons-material/MicRounded';
import { Stream } from 'openai/streaming';
import { ChatCompletionCreateParamsBase } from 'openai/src/resources/chat/completions.ts';
import {
  chatGPTFunctionCall,
  copyImageToClipboard,
  createChatCompletion,
  createImageGeneration,
  fetchContextData,
  speakText,
  removeMarkdown
} from './util';
import {
  chatGptEmptyStateOptionsChat,
  copiedCodeSvg,
  copyCodeSvg,
  defaultChatModel,
  defaultDallEImageSize,
  functionTools
} from './consts';
import SelectLanguageDialog from './SelectLanguageDialog';
import SaveImageDialog from './SaveImageDialog';
import ImageRounded from '@mui/icons-material/ImageRounded';
import ChatGptSideBar from './ChatGPTSideBar';
import userMarkdownParser from './hooks/useMarkdownParser';

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
  <style>
    /*!
      Theme: Default
      Description: Original highlight.js style
      Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
      Maintainer: @highlightjs/core-team
      Website: https://highlightjs.org/
      License: see project LICENSE
      Touched: 2021
    */pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#f3f3f3;color:#444}.hljs-comment{color:#697070}.hljs-punctuation,.hljs-tag{color:#444a}.hljs-tag .hljs-attr,.hljs-tag .hljs-name{color:#444}.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-name,.hljs-selector-tag{font-weight:700}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-operator,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#ab5656}.hljs-literal{color:#695}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta .hljs-string{color:#38a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}
  </style>
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

    .code-container {
      position: relative;
    }

    .copy-button {
      gap: 0.25rem;
      display: flex;
      align-items: center;
      position: absolute;
      top: 4px;
      right: 4px;
      background-color: transparent;
      color: #444444;
      border: 1px solid #d1d5db;
      border-radius: 2px;
      padding-bottom: .25rem;
      padding-top: .25rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    }

    .copy-button:hover {
      background-color: #374151;
      color: white;
      border-color: #374151;
    }

    .copy-button:active {
      background-color: #1f2937;
      color: white;
      border-color: #1f2937;
    }

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

export type ChatMode = 'chat' | 'image';

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
  sxs?: Partial<Record<'root' | 'messages' | 'form' | 'chat', SxProps<Theme>>>;
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
  mode: ChatMode;
  onModeSelected: (mode: ChatMode) => void;
  speakerMode: boolean;
  imageSize: string;
}

export interface ChatGPTRef {
  hasConversation: () => boolean;
}

const ChatGPT = forwardRef<ChatGPTRef, ChatGPTProps>((props, ref) => {
  // region const { ... } = props;
  const {
    sxs,
    model = defaultChatModel,
    userName,
    scrollToReply = true,
    initialMessages,
    aiAvatarColour = '#19c37d',
    extraActions,
    emptyStateOptions = chatGptEmptyStateOptionsChat,
    onExtraActionClick,
    onEmptyStateOptionClick = (e, option, api) => {
      if (option?.prompt) {
        const len = option.prompt.length;
        api.setPrompt(option.prompt);
        api.focusInput(len, len);
      } else if (option?.messages) {
        api.pushMessages(option.messages);
      }
    },
    mode,
    onModeSelected,
    speakerMode,
    imageSize = defaultDallEImageSize
  } = props;
  // endregion
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [settingMenuAnchorEl, setSettingMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [streaming, setStreaming] = useState(false);
  const [recording, setRecording] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<Error>();
  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>(
    initialMessages ?? [
      {
        role: 'system',
        content:
          'You are a helpful customer support assistant and a guru in CrafterCMS. Use your expertise to support the author with CrafterCMS content operations, including publishing, managing, and troubleshooting content-related tasks. Utilize the supplied tools to provide accurate and efficient assistance.'
      },
      {
        role: 'system',
        content:
          "Use the 'publish_content' function when the user asks about publishing a specific content providing a path, or publishing the current content. Ask the confirmation from user if the path is not provided and resolved by the current context or by querying the name."
      }
    ]
  );
  const [imageUrl, setImageUrl] = useState('');
  const [copyingIndex, setCopyingIndex] = useState<number | null>(null);
  const [saveImageDialogOpen, setSaveImageDialogOpen] = useState(false);
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
  const srcDoc = messages.length ? createSrcDoc('', theme) : '';
  const marked = userMarkdownParser();

  useEffect(() => {
    fetchContextData().then((items) => {
      items.forEach((item) => {
        const newMessage: ChatCompletionMessageParam = {
          role: 'system',
          content: `A CrafterCMS page in JSON format: ${JSON.stringify(item)}`
        };
        messagesRef.current.push(newMessage);
        setMessages([...messagesRef.current]);
      });
    });
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingMenuAnchorEl(event.currentTarget);
  };

  const handleSettingMenuClose = () => {
    setSettingMenuAnchorEl(null);
  };

  const handleLanguageDialogOpen = () => {
    setLanguageDialogOpen(true);
    handleSettingMenuClose();
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    handleSettingMenuClose();
    if (recognitionRef.current) {
      recognitionRef.current.lang = languageCode;
    }
  };

  const handleLanguageDialogClose = () => {
    setLanguageDialogOpen(false);
  };

  const handleCopyImage = async (imageUrl: string, index: number) => {
    setCopyingIndex(index);
    try {
      await copyImageToClipboard(imageUrl);
    } catch (error) {
      console.error('Failed to copy image:', error);
    } finally {
      setCopyingIndex(null);
    }
  };

  const submit = async () => {
    abortStream();
    setError(null);
    setStreaming(true);
    setMessages([...messagesRef.current, { role: 'assistant', content: '' }]);
    try {
      let stream;
      if (mode === 'image') {
        stream = streamRef.current = await createImageGeneration({
          model,
          prompt,
          n: 1,
          size: imageSize
        });

        const imageResponse = await stream;

        const imageUrl = imageResponse.data[0]?.url;
        if (imageUrl) {
          const reply: ChatCompletionMessageParam = {
            role: 'assistant',
            content: `<img src="${imageUrl}" class="gen-img" alt="Generated Image" style="max-width: 100%; height: auto;" />`
          };
          messagesRef.current.push(reply);
          setMessages([...messagesRef.current]);
        }
      } else {
        stream = streamRef.current = await createChatCompletion({
          model,
          messages: messagesRef.current,
          stream: true,
          tools: functionTools
        });

        const reply: ChatCompletionMessageParam = { role: 'assistant', content: '' };
        messagesRef.current.push(reply);
        setMessages([...messagesRef.current]);

        let funcName = '';
        let funcArgs = '';
        for await (const part of stream) {
          const content = part.choices[0]?.delta?.content;
          if (content) {
            reply.content += content;
            setMessages([...messagesRef.current]);
          }

          const name = part.choices[0]?.delta?.tool_calls?.[0]?.function?.name;
          if (name) {
            funcName = name;
          }

          const argument = part.choices[0]?.delta?.tool_calls?.[0]?.function?.arguments;
          if (argument) {
            funcArgs += argument;
          }
        }

        if (funcName) {
          const result = await chatGPTFunctionCall(funcName, funcArgs);
          reply.content += result?.message;
          setMessages([...messagesRef.current]);
        }

        if (speakerMode) {
          const contentToSpeak = removeMarkdown(Array.isArray(reply.content) ? reply.content.join(' ') : reply.content);
          speakText(contentToSpeak, selectedLanguage);
        }
      }
    } catch (e) {
      setMessages(messagesRef.current);
      setError(e);
      console.error(e);
    } finally {
      setStreaming(false);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const abortStream = () => {
    streamRef.current?.controller?.abort('Cancelled');
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

    let recordingScript = '';

    const recognition = new (window as SpeechRecognitionWindow).webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        recordingScript += result[0].transcript + ' ';
      }
    };

    recognition.onend = () => {
      setRecording(false);
      setPrompt(recordingScript);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      setRecording(false);
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
      <Box sx={{ display: 'flex', ...sxs?.chat }}>
        <ChatGptSideBar mode={mode} onModeSelected={onModeSelected} />
        <Box sx={{ overflow: 'auto', width: '100%', '*': { boxSizing: 'border-box' }, ...sxs?.messages }}>
          {messages.filter((msg) => msg.role !== 'system').length === 0 && (
            <Box sx={{ width: '100%', p: 2 }}>
              <Paper
                sx={{ maxWidth: '400px', p: 2, mr: 'auto', ml: 'auto', textAlign: 'center', background: 'transparent' }}
                elevation={0}
              >
                {mode === 'image' ? <ImageRounded /> : <OpenAILogo />}
                <Typography variant="h6">
                  {mode === 'chat' ? 'Generative AI Assistant' : 'Generate Image with AI Assistant'}
                </Typography>
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
                  {streaming && content?.length === 0 && index === maxMessageIndex && (
                    <Box>
                      <CircularProgress size={24} />
                    </Box>
                  )}
                  {role === 'assistant' ? (
                    <StyledIframe
                      className="message-iframe"
                      style={{ height: 30 }}
                      srcDoc={srcDoc}
                      ref={async (node) => {
                        if (node?.contentWindow?.document?.documentElement) {
                          const contentString = Array.isArray(content) ? content.join('') : content;
                          node.contentWindow.document.body.innerHTML = !contentString.startsWith('<img')
                            ? await marked.parse(contentString)
                            : contentString;
                          if (!streaming || index !== maxMessageIndex) {
                            const nodeDocument = node.contentWindow.document;
                            nodeDocument.querySelectorAll('pre > code').forEach((codeBlock) => {
                              if (!codeBlock.parentElement.classList.contains('code-container')) {
                                const container = nodeDocument.createElement('div');
                                container.classList.add('code-container');

                                const copyButton = nodeDocument.createElement('button');
                                copyButton.innerHTML = `${copyCodeSvg}Copy code`;
                                copyButton.classList.add('copy-button');

                                copyButton.addEventListener('click', () => {
                                  const code = codeBlock.textContent;
                                  navigator.clipboard
                                    .writeText(code)
                                    .then(() => {
                                      copyButton.innerHTML = `${copiedCodeSvg} Copied!`;
                                      setTimeout(() => {
                                        copyButton.innerHTML = `${copyCodeSvg} Copy code`;
                                      }, 2000);
                                    })
                                    .catch((err) => {
                                      console.error('Failed to copy text:', err);
                                    });
                                });

                                const pre = codeBlock.parentElement;
                                pre.parentNode.replaceChild(container, pre);
                                container.appendChild(copyButton);
                                container.appendChild(pre);
                              }
                            });
                          }
                          if (contentString.startsWith('<img')) {
                            node.style.height = '300px';
                          } else {
                            node.style.height = `${node.contentWindow.document.body.scrollHeight + 5}px`;
                          }
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
                        <Box display="inline-grid" alignItems="center">
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              size="small"
                              onClick={() => {
                                const imageUrlMatch = /src="([^"]+)"/.exec(content);
                                const url = imageUrlMatch ? imageUrlMatch[1] : null;
                                if (url) {
                                  handleCopyImage(url, index);
                                } else {
                                  copyToClipboard(content);
                                }
                              }}
                            >
                              {copyingIndex === index ? (
                                <CircularProgress size={20} />
                              ) : (
                                <ContentPasteRounded fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                          {content.startsWith('<img') && (
                            <>
                              <Tooltip title="Download Image">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    const imageUrlMatch = /src="([^"]+)"/.exec(content);
                                    const url = imageUrlMatch ? imageUrlMatch[1] : null;
                                    if (url) {
                                      window.open(url, '_blank');
                                    }
                                  }}
                                >
                                  <DownloadRouned fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Save Image">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    const imageUrlMatch = /src="([^"]+)"/.exec(content);
                                    const url = imageUrlMatch ? imageUrlMatch[1] : null;
                                    if (url) {
                                      setImageUrl(url);
                                      setSaveImageDialogOpen(true);
                                    }
                                  }}
                                >
                                  <SaveRounded fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </Box>
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
          label="Type or click and hold the mic to talk"
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
                    <Tooltip title="Click and hold to talk">
                      <IconButton
                        size="small"
                        onMouseDown={startVoiceInput}
                        onMouseUp={stopVoiceInput}
                        onMouseLeave={stopVoiceInput}
                        onTouchStart={startVoiceInput}
                        onTouchEnd={stopVoiceInput}
                      >
                        <MicRounded fontSize="small" style={{ color: recording ? 'red' : 'inherit' }} />
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
        <IconButton sx={{ ml: 1 }} onClick={handleMenuClick}>
          <MoreVertRounded />
        </IconButton>
        <Menu anchorEl={settingMenuAnchorEl} open={Boolean(settingMenuAnchorEl)} onClose={handleSettingMenuClose}>
          <MenuItem onClick={handleLanguageDialogOpen}>Set Speech to Text Language</MenuItem>
        </Menu>
        <SelectLanguageDialog
          open={languageDialogOpen}
          language={selectedLanguage}
          onClose={handleLanguageDialogClose}
          onLanguageChange={handleLanguageChange}
        />
        <SaveImageDialog open={saveImageDialogOpen} onClose={() => setSaveImageDialogOpen(false)} url={imageUrl} />
      </Box>
    </Box>
  );
});

export default ChatGPT;
