import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  paperClasses,
  Popover,
  PopoverProps,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/SendRounded';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { createChatCompletion } from './util.ts';
import { ChatCompletionChunk, ChatCompletionMessageParam } from 'openai/resources/chat';
import { ChatCompletionCreateParamsBase } from 'openai/src/resources/chat/completions';
import OpenAILogo from './OpenAI.tsx';
import { Stream } from 'openai/streaming';
import { defaultModel } from './consts.ts';

export interface ChatGPTPromptPopoverProps extends PopoverProps {
  context?: string;
  model?: ChatCompletionCreateParamsBase['model'];
  width?: number | string;
  height?: number | string;
  anchorEl: PopoverProps['anchorEl'];
  print(content: string): void;
  options?: Array<{ label: string; messages: Array<ChatCompletionMessageParam> }>;
}

function ChatGPTPromptPopover(props: Readonly<ChatGPTPromptPopoverProps>) {
  const { model, print, options, context, ...popoverProps } = props;
  const inputRef = useRef<HTMLInputElement>();
  return (
    <Popover
      keepMounted={false}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      BackdropProps={{ invisible: false, sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
      TransitionProps={{ onEntered: () => inputRef.current?.focus() }}
      sx={{ [`.${paperClasses.root}, .${paperClasses.root} > *`]: { boxSizing: 'border-box' } }}
      {...popoverProps}
    >
      <Internal {...props} inputRef={inputRef} />
    </Popover>
  );
}

function Internal(
  props: ChatGPTPromptPopoverProps & {
    inputRef: React.RefObject<HTMLInputElement>;
  }
) {
  const {
    model = defaultModel,
    print,
    context,
    inputRef,
    options = [
      {
        label: 'Improve writing',
        messages: [{ role: 'user', content: 'Improve writing for the following text: {context}' }]
      },
      {
        label: 'Fix spelling & grammar',
        messages: [
          {
            role: 'user',
            content: 'Fix spelling and grammar for the following text: {context}'
          }
        ]
      },
      {
        label: 'Make shorter',
        messages: [{ role: 'user', content: 'Shorten the following text: {context}' }]
      },
      {
        label: 'Make larger',
        messages: [
          {
            role: 'user',
            content: 'Expand the following text to make a better title: {context}'
          }
        ]
      }
    ]
  } = props;
  const [streaming, setStreaming] = useState(false);
  const onClose = streaming ? () => void 0 : props.onClose;
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  // const [error, setError] = useState<Error>();
  // const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>([]);
  const messagesRef = useRef<Array<ChatCompletionMessageParam>>([]);
  const streamRef = useRef<Stream<ChatCompletionChunk>>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    messagesRef.current.push({ role: 'user', content: prompt });
    submit();
  };
  const submit = async () => {
    setStreaming(true);
    setResponse('');
    streamRef.current = await createChatCompletion({
      model,
      stream: true,
      messages: messagesRef.current
    });
    setPrompt('');
    setStreaming(false);
    const response = { role: 'assistant', content: '' };
    messagesRef.current.push(response);
    for await (const chunk of streamRef.current) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        setResponse((response.content += content));
      }
    }
    streamRef.current = null;
  };
  useEffect(() => {
    return () => streamRef.current?.controller.abort('Closed');
  }, []);
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          pr: 1,
          pt: 2.2,
          display: 'flex',
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Autocomplete
          freeSolo
          openOnFocus
          value={null}
          sx={{ width: 400 }}
          disableClearable
          options={options}
          inputValue={prompt}
          onInputChange={(e, value) => {
            setPrompt(value);
          }}
          onChange={(e, value) => {
            if (typeof value !== 'string') {
              messagesRef.current.push(
                ...value.messages.map((message) => ({
                  ...message,
                  content: message.content.replace('{context}', context)
                }))
              );
              submit();
            }
          }}
          filterOptions={(options) => options}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="What can I help you with?"
              disabled={streaming}
              inputRef={inputRef}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <OpenAILogo />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {streaming ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Tooltip title="Send message">
                        <IconButton type="submit" color="primary">
                          <SendIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <IconButton sx={{ ml: 1 }} disabled={streaming} size="small">
          <MoreVertRounded />
        </IconButton>
        <IconButton sx={{ ml: 1 }} disabled={streaming} onClick={(e) => onClose(e, 'escapeKeyDown')} size="small">
          <CloseRounded />
        </IconButton>
      </Box>
      {response && (
        <Box sx={{ p: 2, pt: 0, maxWidth: 500 }}>
          <Typography sx={{ pb: 1 }}>{response}</Typography>
          <Button
            disabled={streaming}
            onClick={() => {
              messagesRef.current.push({ role: 'system', content: 'Generate another alternative' });
              submit();
            }}
          >
            Regenerate
          </Button>
          <Button
            disabled={streaming}
            onClick={(e) => {
              print(response);
              onClose(e, 'escapeKeyDown');
            }}
          >
            Insert
          </Button>
        </Box>
      )}
    </>
  );
}

export default ChatGPTPromptPopover;
