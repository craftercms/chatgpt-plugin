import OpenAI from 'openai';
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionCreateParams,
  ChatCompletionCreateParamsBase,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming
} from 'openai/src/resources/chat/completions';
import * as Core from 'openai/src/core';
import { APIPromise } from 'openai/src/core';
import { Stream } from 'openai/src/streaming';
import { RequestInfo, Response } from 'openai/_shims';
import { User } from '@craftercms/studio-ui';

let openai: OpenAI;
const getOpenAiInstance =
  import.meta.env.MODE === 'development'
    ? () => {
        if (openai) {
          return openai;
        } else {
          return (openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
          }));
        }
      }
    : () => {
        if (openai) {
          return openai;
        } else {
          const state = window.craftercms.getStore().getState();
          const siteId = state.sites.active;
          const authoringBase = state.env.authoringBase;
          const baseOptions = { maxRetries: 0, dangerouslyAllowBrowser: true };
          const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
          return (openai = new OpenAI({
            ...baseOptions,
            // When we have a working proxy service....
            // apiKey: null,
            // baseURL: `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/v1/proxy?siteId=${siteId}`
            // Meanwhile...
            apiKey: null,
            // Retrieves the key when first invoked. Then caches it.
            fetch: async (url: RequestInfo, init?: RequestInfo): Promise<Response> =>
              fetch(`${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/key?siteId=${siteId}`, {
                headers
              })
                .then((response) => response.json())
                .then((response) => {
                  init.headers['authorization'] = `Bearer ${response.result}`;
                  openai = new OpenAI({ ...baseOptions, apiKey: response.result });
                  return fetch(url, init);
                })
          }));
        }
      };

export function createChatCompletion(
  body: ChatCompletionCreateParamsNonStreaming,
  options?: Core.RequestOptions
): APIPromise<ChatCompletion>;
export function createChatCompletion(
  body: ChatCompletionCreateParamsStreaming,
  options?: Core.RequestOptions
): APIPromise<Stream<ChatCompletionChunk>>;
export function createChatCompletion(
  body: ChatCompletionCreateParamsBase,
  options?: Core.RequestOptions
): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>;
export function createChatCompletion(
  body: ChatCompletionCreateParams,
  options?: Core.RequestOptions
): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletionChunk>>;
export function createChatCompletion(body: ChatCompletionCreateParamsBase, options?: OpenAI.RequestOptions) {
  return getOpenAiInstance().chat.completions.create(body, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: body.stream ? 'text/event-stream' : 'application/json'
    }
  });
}

export function createUsername(user: User) {
  const { firstName, lastName, username } = user;
  return `${firstName} ${lastName}`.trim() || username;
}


/**
 * Fetches the list of chat models from OpenAI.
 * https://platform.openai.com/docs/models/model-endpoint-compatibility
 * @returns The list of models.
 */
export async function listChatModels() {
  try {
    const response = await getOpenAiInstance().models.list();
    return response.data
                    .filter(model =>
                      !model.id.includes('realtime') &&
                      !model.id.includes('audio') &&
                      !model.id.includes('turbo-instruct') &&
                      (model.id.includes('gpt-3.5') || model.id.includes('gpt-4'))
                    )
                    .sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
}
