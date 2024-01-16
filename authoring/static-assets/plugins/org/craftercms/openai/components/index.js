const { jsx, jsxs, Fragment } = craftercms.libs?.reactJsxRuntime;
const { styled, Box, Avatar, useTheme, Paper, Typography, Card, CardActionArea, CardHeader, Tooltip, IconButton, Button, Alert, TextField, InputAdornment, Popover, paperClasses, AppBar } = craftercms.libs.MaterialUI;
const CloseRounded = craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded');
const { useState, useRef, useEffect } = craftercms.libs.React;
const { createSvgIcon } = craftercms.libs.MaterialUI;
const SendIcon = craftercms.utils.constants.components.get('@mui/icons-material/SendRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SendRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SendRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SendRounded');
const ContentPasteRounded = craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded');
const StopRounded = craftercms.utils.constants.components.get('@mui/icons-material/StopRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/StopRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/StopRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/StopRounded');
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const { useSelector } = craftercms.libs.ReactRedux;
const { getGuestToHostBus, getHostToHostBus, getHostToGuestBus } = craftercms.utils.subjects;
const { merge } = craftercms.libs.rxjs;

var OpenAI$2 = createSvgIcon(jsx("path", { d: "M21.9706 9.87533C22.233 9.08708 22.3241 8.25193 22.2376 7.42569C22.1511 6.59945 21.8892 5.80122 21.4692 5.08441C20.8468 4.00021 19.8959 3.14181 18.7539 2.63307C17.6119 2.12433 16.3378 1.99156 15.1154 2.25391C14.564 1.63256 13.8864 1.13614 13.1276 0.797891C12.3689 0.459646 11.5467 0.28737 10.716 0.292596C9.4662 0.28958 8.24776 0.683523 7.23631 1.41764C6.22486 2.15174 5.47268 3.18809 5.08819 4.37725C4.27404 4.54391 3.50487 4.88257 2.83219 5.37056C2.15951 5.85855 1.59885 6.4846 1.18772 7.20682C0.560251 8.28805 0.292411 9.54056 0.422827 10.7839C0.553243 12.0271 1.07517 13.1968 1.91334 14.1243C1.6509 14.9125 1.55986 15.7477 1.64631 16.5739C1.73277 17.4002 1.99472 18.1984 2.41463 18.9152C3.03719 19.9994 3.98806 20.8577 5.13005 21.3664C6.27204 21.8752 7.54615 22.008 8.76851 21.7457C9.31986 22.367 9.9976 22.8634 10.7563 23.2017C11.515 23.5399 12.3372 23.7122 13.1679 23.707C14.4183 23.7103 15.6374 23.3162 16.6492 22.5816C17.6611 21.847 18.4134 20.8099 18.7976 19.62C19.6117 19.4534 20.3809 19.1147 21.0536 18.6267C21.7262 18.1388 22.2869 17.5127 22.698 16.7904C23.3247 15.7093 23.592 14.4571 23.4612 13.2143C23.3305 11.9715 22.8085 10.8024 21.9706 9.87533ZM13.1698 22.1763C12.1434 22.1778 11.1492 21.8183 10.361 21.1608C10.3965 21.1415 10.4589 21.1073 10.4995 21.0824L15.1616 18.3894C15.2786 18.3229 15.3758 18.2263 15.4431 18.1097C15.5105 17.9931 15.5455 17.8607 15.5447 17.7261V11.1535L17.5153 12.2913C17.5256 12.2965 17.5345 12.3041 17.5412 12.3135C17.5479 12.3229 17.5521 12.3339 17.5536 12.3453V17.7884C17.5521 18.951 17.0899 20.0656 16.2682 20.8881C15.4465 21.7106 14.3324 22.1738 13.1698 22.1763ZM3.74219 18.1499C3.22806 17.2615 3.04276 16.2207 3.21873 15.2095C3.25335 15.2303 3.31382 15.2672 3.35721 15.2921L8.0193 17.985C8.13549 18.0529 8.26767 18.0888 8.40224 18.0888C8.53676 18.0888 8.66894 18.0529 8.78513 17.985L14.4771 14.6985V16.9742C14.4777 16.9858 14.4755 16.9974 14.4706 17.008C14.4656 17.0185 14.4582 17.0277 14.4489 17.0346L9.736 19.7557C8.72794 20.3363 7.53069 20.4933 6.40702 20.1922C5.28333 19.8912 4.32496 19.1567 3.74219 18.1499ZM2.51573 7.97213C3.02762 7.08261 3.83615 6.40159 4.7997 6.04821C4.7997 6.08836 4.79739 6.15949 4.79739 6.20883V11.5947C4.79657 11.7292 4.83159 11.8615 4.89885 11.9781C4.9661 12.0946 5.06316 12.191 5.18006 12.2576L10.872 15.5437L8.90144 16.6815C8.89173 16.6879 8.88055 16.6918 8.86896 16.6929C8.85737 16.6939 8.84566 16.6921 8.83495 16.6875L4.12161 13.9641C3.11531 13.3813 2.38115 12.4233 2.08011 11.3001C1.77907 10.1769 1.93573 8.98007 2.51573 7.97213ZM18.7057 11.7397L13.0138 8.45312L14.9843 7.31576C14.994 7.30938 15.0052 7.30546 15.0168 7.3044C15.0284 7.30335 15.0401 7.30522 15.0508 7.30979L19.7641 10.0309C20.4862 10.448 21.0745 11.0622 21.4602 11.8015C21.8459 12.5409 22.0129 13.3748 21.9418 14.2057C21.8706 15.0366 21.5642 15.83 21.0585 16.493C20.5527 17.1561 19.8686 17.6613 19.086 17.9495C19.086 17.9089 19.086 17.8378 19.086 17.7884V12.4025C19.0872 12.2682 19.0525 12.1361 18.9857 12.0196C18.9188 11.9031 18.8222 11.8065 18.7057 11.7397ZM20.667 8.78778C20.6324 8.76653 20.5719 8.73006 20.5286 8.70518L15.8664 6.01221C15.7502 5.94442 15.6181 5.90866 15.4835 5.90866C15.349 5.90866 15.2168 5.94442 15.1006 6.01221L9.40872 9.2988V7.02313C9.40808 7.01149 9.4103 6.9999 9.41522 6.98936C9.42014 6.97882 9.42757 6.96963 9.43688 6.96267L14.1498 4.24385C14.8718 3.82752 15.6974 3.62541 16.5301 3.66116C17.3628 3.6969 18.168 3.96903 18.8517 4.4457C19.5354 4.92237 20.0692 5.58387 20.3907 6.35283C20.7121 7.12177 20.808 7.96633 20.667 8.78778ZM8.33738 12.8438L6.36634 11.706C6.35604 11.7009 6.34708 11.6932 6.34041 11.6838C6.33374 11.6744 6.32946 11.6634 6.32806 11.652V6.20883C6.32858 5.37518 6.56659 4.55891 7.01416 3.85558C7.46179 3.15225 8.10049 2.59097 8.85549 2.23744C9.6105 1.88391 10.4506 1.75276 11.2774 1.85933C12.1043 1.9659 12.8836 2.30579 13.5243 2.83921C13.4888 2.8586 13.4269 2.89276 13.3858 2.91769L8.72373 5.61063C8.60671 5.67713 8.5096 5.77359 8.44222 5.8901C8.37491 6.00659 8.33984 6.13894 8.3406 6.27346L8.33738 12.8438ZM9.40778 10.5359L11.9429 9.07168L14.4779 10.5349V13.4623L11.9429 14.9256L9.40778 13.4623V10.5359Z" }), 'OpenAI');

const VERSION = '4.24.7'; // x-release-please-version

let auto = false;
let kind = undefined;
let fetch$1 = undefined;
let FormData$1 = undefined;
let File$1 = undefined;
let ReadableStream$1 = undefined;
let getMultipartRequestOptions = undefined;
let getDefaultAgent = undefined;
let fileFromPath = undefined;
let isFsReadStream = undefined;
function setShims(shims, options = { auto: false }) {
    if (auto) {
        throw new Error(`you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`);
    }
    if (kind) {
        throw new Error(`can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${kind}'\``);
    }
    auto = options.auto;
    kind = shims.kind;
    fetch$1 = shims.fetch;
    shims.Request;
    shims.Response;
    shims.Headers;
    FormData$1 = shims.FormData;
    shims.Blob;
    File$1 = shims.File;
    ReadableStream$1 = shims.ReadableStream;
    getMultipartRequestOptions = shims.getMultipartRequestOptions;
    getDefaultAgent = shims.getDefaultAgent;
    fileFromPath = shims.fileFromPath;
    isFsReadStream = shims.isFsReadStream;
}

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
class MultipartBody {
    constructor(body) {
        this.body = body;
    }
    get [Symbol.toStringTag]() {
        return 'MultipartBody';
    }
}

function getRuntime({ manuallyImported } = {}) {
    const recommendation = manuallyImported ?
        `You may need to use polyfills`
        : `Add one of these imports before your first \`import … from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
    let _fetch, _Request, _Response, _Headers;
    try {
        // @ts-ignore
        _fetch = fetch;
        // @ts-ignore
        _Request = Request;
        // @ts-ignore
        _Response = Response;
        // @ts-ignore
        _Headers = Headers;
    }
    catch (error) {
        throw new Error(`this environment is missing the following Web Fetch API type: ${error.message}. ${recommendation}`);
    }
    return {
        kind: 'web',
        fetch: _fetch,
        Request: _Request,
        Response: _Response,
        Headers: _Headers,
        FormData: 
        // @ts-ignore
        typeof FormData !== 'undefined' ? FormData : (class FormData {
            // @ts-ignore
            constructor() {
                throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`);
            }
        }),
        Blob: typeof Blob !== 'undefined' ? Blob : (class Blob {
            constructor() {
                throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`);
            }
        }),
        File: 
        // @ts-ignore
        typeof File !== 'undefined' ? File : (class File {
            // @ts-ignore
            constructor() {
                throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`);
            }
        }),
        ReadableStream: 
        // @ts-ignore
        typeof ReadableStream !== 'undefined' ? ReadableStream : (class ReadableStream {
            // @ts-ignore
            constructor() {
                throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`);
            }
        }),
        getMultipartRequestOptions: async (
        // @ts-ignore
        form, opts) => ({
            ...opts,
            body: new MultipartBody(form),
        }),
        getDefaultAgent: (url) => undefined,
        fileFromPath: () => {
            throw new Error('The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads');
        },
        isFsReadStream: (value) => false,
    };
}

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
if (!kind) setShims(getRuntime(), { auto: true });

// File generated from our OpenAPI spec by Stainless.
class OpenAIError extends Error {
}
class APIError extends OpenAIError {
    constructor(status, error, message, headers) {
        super(`${APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        const data = error;
        this.error = data;
        this.code = data?.['code'];
        this.param = data?.['param'];
        this.type = data?.['type'];
    }
    static makeMessage(status, error, message) {
        const msg = error?.message ?
            typeof error.message === 'string' ?
                error.message
                : JSON.stringify(error.message)
            : error ? JSON.stringify(error)
                : message;
        if (status && msg) {
            return `${status} ${msg}`;
        }
        if (status) {
            return `${status} status code (no body)`;
        }
        if (msg) {
            return msg;
        }
        return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
        if (!status) {
            return new APIConnectionError({ cause: castToError(errorResponse) });
        }
        const error = errorResponse?.['error'];
        if (status === 400) {
            return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
            return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
            return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
            return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
            return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
            return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
            return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
            return new InternalServerError(status, error, message, headers);
        }
        return new APIError(status, error, message, headers);
    }
}
class APIUserAbortError extends APIError {
    constructor({ message } = {}) {
        super(undefined, undefined, message || 'Request was aborted.', undefined);
        this.status = undefined;
    }
}
class APIConnectionError extends APIError {
    constructor({ message, cause }) {
        super(undefined, undefined, message || 'Connection error.', undefined);
        this.status = undefined;
        // in some environments the 'cause' property is already declared
        // @ts-ignore
        if (cause)
            this.cause = cause;
    }
}
class APIConnectionTimeoutError extends APIConnectionError {
    constructor({ message } = {}) {
        super({ message: message ?? 'Request timed out.' });
    }
}
class BadRequestError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 400;
    }
}
class AuthenticationError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 401;
    }
}
class PermissionDeniedError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 403;
    }
}
class NotFoundError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 404;
    }
}
class ConflictError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 409;
    }
}
class UnprocessableEntityError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 422;
    }
}
class RateLimitError extends APIError {
    constructor() {
        super(...arguments);
        this.status = 429;
    }
}
class InternalServerError extends APIError {
}

class Stream {
    constructor(iterator, controller) {
        this.iterator = iterator;
        this.controller = controller;
    }
    static fromSSEResponse(response, controller) {
        let consumed = false;
        const decoder = new SSEDecoder();
        async function* iterMessages() {
            if (!response.body) {
                controller.abort();
                throw new OpenAIError(`Attempted to iterate over a response with no body`);
            }
            const lineDecoder = new LineDecoder();
            const iter = readableStreamAsyncIterable(response.body);
            for await (const chunk of iter) {
                for (const line of lineDecoder.decode(chunk)) {
                    const sse = decoder.decode(line);
                    if (sse)
                        yield sse;
                }
            }
            for (const line of lineDecoder.flush()) {
                const sse = decoder.decode(line);
                if (sse)
                    yield sse;
            }
        }
        async function* iterator() {
            if (consumed) {
                throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const sse of iterMessages()) {
                    if (done)
                        continue;
                    if (sse.data.startsWith('[DONE]')) {
                        done = true;
                        continue;
                    }
                    if (sse.event === null) {
                        let data;
                        try {
                            data = JSON.parse(sse.data);
                        }
                        catch (e) {
                            console.error(`Could not parse message into JSON:`, sse.data);
                            console.error(`From chunk:`, sse.raw);
                            throw e;
                        }
                        if (data && data.error) {
                            throw new APIError(undefined, data.error, undefined, undefined);
                        }
                        yield data;
                    }
                }
                done = true;
            }
            catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if (e instanceof Error && e.name === 'AbortError')
                    return;
                throw e;
            }
            finally {
                // If the user `break`s, abort the ongoing request.
                if (!done)
                    controller.abort();
            }
        }
        return new Stream(iterator, controller);
    }
    /**
     * Generates a Stream from a newline-separated ReadableStream
     * where each item is a JSON value.
     */
    static fromReadableStream(readableStream, controller) {
        let consumed = false;
        async function* iterLines() {
            const lineDecoder = new LineDecoder();
            const iter = readableStreamAsyncIterable(readableStream);
            for await (const chunk of iter) {
                for (const line of lineDecoder.decode(chunk)) {
                    yield line;
                }
            }
            for (const line of lineDecoder.flush()) {
                yield line;
            }
        }
        async function* iterator() {
            if (consumed) {
                throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const line of iterLines()) {
                    if (done)
                        continue;
                    if (line)
                        yield JSON.parse(line);
                }
                done = true;
            }
            catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if (e instanceof Error && e.name === 'AbortError')
                    return;
                throw e;
            }
            finally {
                // If the user `break`s, abort the ongoing request.
                if (!done)
                    controller.abort();
            }
        }
        return new Stream(iterator, controller);
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
    /**
     * Splits the stream into two streams which can be
     * independently read from at different speeds.
     */
    tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = (queue) => {
            return {
                next: () => {
                    if (queue.length === 0) {
                        const result = iterator.next();
                        left.push(result);
                        right.push(result);
                    }
                    return queue.shift();
                },
            };
        };
        return [
            new Stream(() => teeIterator(left), this.controller),
            new Stream(() => teeIterator(right), this.controller),
        ];
    }
    /**
     * Converts this stream to a newline-separated ReadableStream of
     * JSON stringified values in the stream
     * which can be turned back into a Stream with `Stream.fromReadableStream()`.
     */
    toReadableStream() {
        const self = this;
        let iter;
        const encoder = new TextEncoder();
        return new ReadableStream$1({
            async start() {
                iter = self[Symbol.asyncIterator]();
            },
            async pull(ctrl) {
                try {
                    const { value, done } = await iter.next();
                    if (done)
                        return ctrl.close();
                    const bytes = encoder.encode(JSON.stringify(value) + '\n');
                    ctrl.enqueue(bytes);
                }
                catch (err) {
                    ctrl.error(err);
                }
            },
            async cancel() {
                await iter.return?.();
            },
        });
    }
}
class SSEDecoder {
    constructor() {
        this.event = null;
        this.data = [];
        this.chunks = [];
    }
    decode(line) {
        if (line.endsWith('\r')) {
            line = line.substring(0, line.length - 1);
        }
        if (!line) {
            // empty line and we didn't previously encounter any messages
            if (!this.event && !this.data.length)
                return null;
            const sse = {
                event: this.event,
                data: this.data.join('\n'),
                raw: this.chunks,
            };
            this.event = null;
            this.data = [];
            this.chunks = [];
            return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(':')) {
            return null;
        }
        let [fieldname, _, value] = partition(line, ':');
        if (value.startsWith(' ')) {
            value = value.substring(1);
        }
        if (fieldname === 'event') {
            this.event = value;
        }
        else if (fieldname === 'data') {
            this.data.push(value);
        }
        return null;
    }
}
/**
 * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
 * reading lines from text.
 *
 * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 */
class LineDecoder {
    constructor() {
        this.buffer = [];
        this.trailingCR = false;
    }
    decode(chunk) {
        let text = this.decodeText(chunk);
        if (this.trailingCR) {
            text = '\r' + text;
            this.trailingCR = false;
        }
        if (text.endsWith('\r')) {
            this.trailingCR = true;
            text = text.slice(0, -1);
        }
        if (!text) {
            return [];
        }
        const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || '');
        let lines = text.split(LineDecoder.NEWLINE_REGEXP);
        if (lines.length === 1 && !trailingNewline) {
            this.buffer.push(lines[0]);
            return [];
        }
        if (this.buffer.length > 0) {
            lines = [this.buffer.join('') + lines[0], ...lines.slice(1)];
            this.buffer = [];
        }
        if (!trailingNewline) {
            this.buffer = [lines.pop() || ''];
        }
        return lines;
    }
    decodeText(bytes) {
        if (bytes == null)
            return '';
        if (typeof bytes === 'string')
            return bytes;
        // Node:
        if (typeof Buffer !== 'undefined') {
            if (bytes instanceof Buffer) {
                return bytes.toString();
            }
            if (bytes instanceof Uint8Array) {
                return Buffer.from(bytes).toString();
            }
            throw new OpenAIError(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
        }
        // Browser
        if (typeof TextDecoder !== 'undefined') {
            if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
                this.textDecoder ?? (this.textDecoder = new TextDecoder('utf8'));
                return this.textDecoder.decode(bytes);
            }
            throw new OpenAIError(`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
        }
        throw new OpenAIError(`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
    }
    flush() {
        if (!this.buffer.length && !this.trailingCR) {
            return [];
        }
        const lines = [this.buffer.join('')];
        this.buffer = [];
        this.trailingCR = false;
        return lines;
    }
}
// prettier-ignore
LineDecoder.NEWLINE_CHARS = new Set(['\n', '\r', '\x0b', '\x0c', '\x1c', '\x1d', '\x1e', '\x85', '\u2028', '\u2029']);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;
function partition(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
        return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
    }
    return [str, '', ''];
}
/**
 * Most browsers don't yet have async iterable support for ReadableStream,
 * and Node has a very different way of reading bytes from its "ReadableStream".
 *
 * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
function readableStreamAsyncIterable(stream) {
    if (stream[Symbol.asyncIterator])
        return stream;
    const reader = stream.getReader();
    return {
        async next() {
            try {
                const result = await reader.read();
                if (result?.done)
                    reader.releaseLock(); // release lock when stream becomes closed
                return result;
            }
            catch (e) {
                reader.releaseLock(); // release lock when stream becomes errored
                throw e;
            }
        },
        async return() {
            const cancelPromise = reader.cancel();
            reader.releaseLock();
            await cancelPromise;
            return { done: true, value: undefined };
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
}

const isResponseLike = (value) => value != null &&
    typeof value === 'object' &&
    typeof value.url === 'string' &&
    typeof value.blob === 'function';
const isFileLike = (value) => value != null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.lastModified === 'number' &&
    isBlobLike(value);
/**
 * The BlobLike type omits arrayBuffer() because @types/node-fetch@^2.6.4 lacks it; but this check
 * adds the arrayBuffer() method type because it is available and used at runtime
 */
const isBlobLike = (value) => value != null &&
    typeof value === 'object' &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.text === 'function' &&
    typeof value.slice === 'function' &&
    typeof value.arrayBuffer === 'function';
const isUploadable = (value) => {
    return isFileLike(value) || isResponseLike(value) || isFsReadStream(value);
};
/**
 * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
 * @param value the raw content of the file.  Can be an {@link Uploadable}, {@link BlobLikePart}, or {@link AsyncIterable} of {@link BlobLikePart}s
 * @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
 * @param {Object=} options additional properties
 * @param {string=} options.type the MIME type of the content
 * @param {number=} options.lastModified the last modified timestamp
 * @returns a {@link File} with the given properties
 */
async function toFile(value, name, options = {}) {
    // If it's a promise, resolve it.
    value = await value;
    if (isResponseLike(value)) {
        const blob = await value.blob();
        name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? 'unknown_file');
        return new File$1([blob], name, options);
    }
    const bits = await getBytes(value);
    name || (name = getName(value) ?? 'unknown_file');
    if (!options.type) {
        const type = bits[0]?.type;
        if (typeof type === 'string') {
            options = { ...options, type };
        }
    }
    return new File$1(bits, name, options);
}
async function getBytes(value) {
    let parts = [];
    if (typeof value === 'string' ||
        ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
        value instanceof ArrayBuffer) {
        parts.push(value);
    }
    else if (isBlobLike(value)) {
        parts.push(await value.arrayBuffer());
    }
    else if (isAsyncIterableIterator(value) // includes Readable, ReadableStream, etc.
    ) {
        for await (const chunk of value) {
            parts.push(chunk); // TODO, consider validating?
        }
    }
    else {
        throw new Error(`Unexpected data type: ${typeof value}; constructor: ${value?.constructor
            ?.name}; props: ${propsForError(value)}`);
    }
    return parts;
}
function propsForError(value) {
    const props = Object.getOwnPropertyNames(value);
    return `[${props.map((p) => `"${p}"`).join(', ')}]`;
}
function getName(value) {
    return (getStringFromMaybeBuffer(value.name) ||
        getStringFromMaybeBuffer(value.filename) ||
        // For fs.ReadStream
        getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop());
}
const getStringFromMaybeBuffer = (x) => {
    if (typeof x === 'string')
        return x;
    if (typeof Buffer !== 'undefined' && x instanceof Buffer)
        return String(x);
    return undefined;
};
const isAsyncIterableIterator = (value) => value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
const isMultipartBody = (body) => body && typeof body === 'object' && body.body && body[Symbol.toStringTag] === 'MultipartBody';
const multipartFormRequestOptions = async (opts) => {
    const form = await createForm(opts.body);
    return getMultipartRequestOptions(form, opts);
};
const createForm = async (body) => {
    const form = new FormData$1();
    await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
    return form;
};
const addFormValue = async (form, key, value) => {
    if (value === undefined)
        return;
    if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
    }
    // TODO: make nested formats configurable
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        form.append(key, String(value));
    }
    else if (isUploadable(value)) {
        const file = await toFile(value);
        form.append(key, file);
    }
    else if (Array.isArray(value)) {
        await Promise.all(value.map((entry) => addFormValue(form, key + '[]', entry)));
    }
    else if (typeof value === 'object') {
        await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
    }
    else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
    }
};

var __classPrivateFieldSet$2 = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$2 = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractPage_client;
async function defaultParseResponse(props) {
    const { response } = props;
    if (props.options.stream) {
        debug('response', response.status, response.url, response.headers, response.body);
        // Note: there is an invariant here that isn't represented in the type system
        // that if you set `stream: true` the response type must also be `Stream<T>`
        return Stream.fromSSEResponse(response, props.controller);
    }
    // fetch refuses to read the body when the status code is 204.
    if (response.status === 204) {
        return null;
    }
    if (props.options.__binaryResponse) {
        return response;
    }
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        const json = await response.json();
        debug('response', response.status, response.url, response.headers, json);
        return json;
    }
    const text = await response.text();
    debug('response', response.status, response.url, response.headers, text);
    // TODO handle blob, arraybuffer, other content types, etc.
    return text;
}
/**
 * A subclass of `Promise` providing additional helper methods
 * for interacting with the SDK.
 */
class APIPromise extends Promise {
    constructor(responsePromise, parseResponse = defaultParseResponse) {
        super((resolve) => {
            // this is maybe a bit weird but this has to be a no-op to not implicitly
            // parse the response body; instead .then, .catch, .finally are overridden
            // to parse the response
            resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
    }
    _thenUnwrap(transform) {
        return new APIPromise(this.responsePromise, async (props) => transform(await this.parseResponse(props)));
    }
    /**
     * Gets the raw `Response` instance instead of parsing the response
     * data.
     *
     * If you want to parse the response body but still get the `Response`
     * instance, you can use {@link withResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'openai'`:
     * - `import 'openai/shims/node'` (if you're running on Node)
     * - `import 'openai/shims/web'` (otherwise)
     */
    asResponse() {
        return this.responsePromise.then((p) => p.response);
    }
    /**
     * Gets the parsed response data and the raw `Response` instance.
     *
     * If you just want to get the raw `Response` instance without parsing it,
     * you can use {@link asResponse()}.
     *
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'openai'`:
     * - `import 'openai/shims/node'` (if you're running on Node)
     * - `import 'openai/shims/web'` (otherwise)
     */
    async withResponse() {
        const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
        return { data, response };
    }
    parse() {
        if (!this.parsedPromise) {
            this.parsedPromise = this.responsePromise.then(this.parseResponse);
        }
        return this.parsedPromise;
    }
    then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.parse().catch(onrejected);
    }
    finally(onfinally) {
        return this.parse().finally(onfinally);
    }
}
class APIClient {
    constructor({ baseURL, maxRetries = 2, timeout = 600000, // 10 minutes
    httpAgent, fetch: overridenFetch, }) {
        this.baseURL = baseURL;
        this.maxRetries = validatePositiveInteger('maxRetries', maxRetries);
        this.timeout = validatePositiveInteger('timeout', timeout);
        this.httpAgent = httpAgent;
        this.fetch = overridenFetch ?? fetch$1;
    }
    authHeaders(opts) {
        return {};
    }
    /**
     * Override this to add your own default headers, for example:
     *
     *  {
     *    ...super.defaultHeaders(),
     *    Authorization: 'Bearer 123',
     *  }
     */
    defaultHeaders(opts) {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': this.getUserAgent(),
            ...getPlatformHeaders(),
            ...this.authHeaders(opts),
        };
    }
    /**
     * Override this to add your own headers validation:
     */
    validateHeaders(headers, customHeaders) { }
    defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
    }
    get(path, opts) {
        return this.methodRequest('get', path, opts);
    }
    post(path, opts) {
        return this.methodRequest('post', path, opts);
    }
    patch(path, opts) {
        return this.methodRequest('patch', path, opts);
    }
    put(path, opts) {
        return this.methodRequest('put', path, opts);
    }
    delete(path, opts) {
        return this.methodRequest('delete', path, opts);
    }
    methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then((opts) => ({ method, path, ...opts })));
    }
    getAPIList(path, Page, opts) {
        return this.requestAPIList(Page, { method: 'get', path, ...opts });
    }
    calculateContentLength(body) {
        if (typeof body === 'string') {
            if (typeof Buffer !== 'undefined') {
                return Buffer.byteLength(body, 'utf8').toString();
            }
            if (typeof TextEncoder !== 'undefined') {
                const encoder = new TextEncoder();
                const encoded = encoder.encode(body);
                return encoded.length.toString();
            }
        }
        return null;
    }
    buildRequest(options) {
        const { method, path, query, headers: headers = {} } = options;
        const body = isMultipartBody(options.body) ? options.body.body
            : options.body ? JSON.stringify(options.body, null, 2)
                : null;
        const contentLength = this.calculateContentLength(body);
        const url = this.buildURL(path, query);
        if ('timeout' in options)
            validatePositiveInteger('timeout', options.timeout);
        const timeout = options.timeout ?? this.timeout;
        const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
        const minAgentTimeout = timeout + 1000;
        if (typeof httpAgent?.options?.timeout === 'number' &&
            minAgentTimeout > (httpAgent.options.timeout ?? 0)) {
            // Allow any given request to bump our agent active socket timeout.
            // This may seem strange, but leaking active sockets should be rare and not particularly problematic,
            // and without mutating agent we would need to create more of them.
            // This tradeoff optimizes for performance.
            httpAgent.options.timeout = minAgentTimeout;
        }
        if (this.idempotencyHeader && method !== 'get') {
            if (!options.idempotencyKey)
                options.idempotencyKey = this.defaultIdempotencyKey();
            headers[this.idempotencyHeader] = options.idempotencyKey;
        }
        const reqHeaders = this.buildHeaders({ options, headers, contentLength });
        const req = {
            method,
            ...(body && { body: body }),
            headers: reqHeaders,
            ...(httpAgent && { agent: httpAgent }),
            // @ts-ignore node-fetch uses a custom AbortSignal type that is
            // not compatible with standard web types
            signal: options.signal ?? null,
        };
        return { req, url, timeout };
    }
    buildHeaders({ options, headers, contentLength, }) {
        const reqHeaders = {};
        if (contentLength) {
            reqHeaders['content-length'] = contentLength;
        }
        const defaultHeaders = this.defaultHeaders(options);
        applyHeadersMut(reqHeaders, defaultHeaders);
        applyHeadersMut(reqHeaders, headers);
        // let builtin fetch set the Content-Type for multipart bodies
        if (isMultipartBody(options.body) && kind !== 'node') {
            delete reqHeaders['content-type'];
        }
        this.validateHeaders(reqHeaders, headers);
        return reqHeaders;
    }
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */
    async prepareRequest(request, { url, options }) { }
    parseHeaders(headers) {
        return (!headers ? {}
            : Symbol.iterator in headers ?
                Object.fromEntries(Array.from(headers).map((header) => [...header]))
                : { ...headers });
    }
    makeStatusError(status, error, message, headers) {
        return APIError.generate(status, error, message, headers);
    }
    request(options, remainingRetries = null) {
        return new APIPromise(this.makeRequest(options, remainingRetries));
    }
    async makeRequest(optionsInput, retriesRemaining) {
        const options = await optionsInput;
        if (retriesRemaining == null) {
            retriesRemaining = options.maxRetries ?? this.maxRetries;
        }
        const { req, url, timeout } = this.buildRequest(options);
        await this.prepareRequest(req, { url, options });
        debug('request', url, options, req.headers);
        if (options.signal?.aborted) {
            throw new APIUserAbortError();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
        if (response instanceof Error) {
            if (options.signal?.aborted) {
                throw new APIUserAbortError();
            }
            if (retriesRemaining) {
                return this.retryRequest(options, retriesRemaining);
            }
            if (response.name === 'AbortError') {
                throw new APIConnectionTimeoutError();
            }
            throw new APIConnectionError({ cause: response });
        }
        const responseHeaders = createResponseHeaders(response.headers);
        if (!response.ok) {
            if (retriesRemaining && this.shouldRetry(response)) {
                return this.retryRequest(options, retriesRemaining, responseHeaders);
            }
            const errText = await response.text().catch((e) => castToError(e).message);
            const errJSON = safeJSON(errText);
            const errMessage = errJSON ? undefined : errText;
            debug('response', response.status, url, responseHeaders, errMessage);
            const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
            throw err;
        }
        return { response, options, controller };
    }
    requestAPIList(Page, options) {
        const request = this.makeRequest(options, null);
        return new PagePromise(this, request, Page);
    }
    buildURL(path, query) {
        const url = isAbsoluteURL(path) ?
            new URL(path)
            : new URL(this.baseURL + (this.baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        if (!isEmptyObj(defaultQuery)) {
            query = { ...defaultQuery, ...query };
        }
        if (typeof query === 'object' && query && !Array.isArray(query)) {
            url.search = this.stringifyQuery(query);
        }
        return url.toString();
    }
    stringifyQuery(query) {
        return Object.entries(query)
            .filter(([_, value]) => typeof value !== 'undefined')
            .map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
            if (value === null) {
                return `${encodeURIComponent(key)}=`;
            }
            throw new OpenAIError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
        })
            .join('&');
    }
    async fetchWithTimeout(url, init, ms, controller) {
        const { signal, ...options } = init || {};
        if (signal)
            signal.addEventListener('abort', () => controller.abort());
        const timeout = setTimeout(() => controller.abort(), ms);
        return (this.getRequestClient()
            // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
            .fetch.call(undefined, url, { signal: controller.signal, ...options })
            .finally(() => {
            clearTimeout(timeout);
        }));
    }
    getRequestClient() {
        return { fetch: this.fetch };
    }
    shouldRetry(response) {
        // Note this is not a standard header.
        const shouldRetryHeader = response.headers.get('x-should-retry');
        // If the server explicitly says whether or not to retry, obey.
        if (shouldRetryHeader === 'true')
            return true;
        if (shouldRetryHeader === 'false')
            return false;
        // Retry on request timeouts.
        if (response.status === 408)
            return true;
        // Retry on lock timeouts.
        if (response.status === 409)
            return true;
        // Retry on rate limits.
        if (response.status === 429)
            return true;
        // Retry internal errors.
        if (response.status >= 500)
            return true;
        return false;
    }
    async retryRequest(options, retriesRemaining, responseHeaders) {
        // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
        let timeoutMillis;
        const retryAfterHeader = responseHeaders?.['retry-after'];
        if (retryAfterHeader) {
            const timeoutSeconds = parseInt(retryAfterHeader);
            if (!Number.isNaN(timeoutSeconds)) {
                timeoutMillis = timeoutSeconds * 1000;
            }
            else {
                timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
            }
        }
        // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
        // just do what it says, but otherwise calculate a default
        if (!timeoutMillis ||
            !Number.isInteger(timeoutMillis) ||
            timeoutMillis <= 0 ||
            timeoutMillis > 60 * 1000) {
            const maxRetries = options.maxRetries ?? this.maxRetries;
            timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await sleep(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1);
    }
    calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8.0;
        const numRetries = maxRetries - retriesRemaining;
        // Apply exponential backoff, but not more than the max.
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        // Apply some jitter, take up to at most 25 percent of the retry time.
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1000;
    }
    getUserAgent() {
        return `${this.constructor.name}/JS ${VERSION}`;
    }
}
class AbstractPage {
    constructor(client, response, body, options) {
        _AbstractPage_client.set(this, void 0);
        __classPrivateFieldSet$2(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
    }
    hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length)
            return false;
        return this.nextPageInfo() != null;
    }
    async getNextPage() {
        const nextInfo = this.nextPageInfo();
        if (!nextInfo) {
            throw new OpenAIError('No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.');
        }
        const nextOptions = { ...this.options };
        if ('params' in nextInfo && typeof nextOptions.query === 'object') {
            nextOptions.query = { ...nextOptions.query, ...nextInfo.params };
        }
        else if ('url' in nextInfo) {
            const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
            for (const [key, value] of params) {
                nextInfo.url.searchParams.set(key, value);
            }
            nextOptions.query = undefined;
            nextOptions.path = nextInfo.url.toString();
        }
        return await __classPrivateFieldGet$2(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
    }
    async *iterPages() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let page = this;
        yield page;
        while (page.hasNextPage()) {
            page = await page.getNextPage();
            yield page;
        }
    }
    async *[(_AbstractPage_client = new WeakMap(), Symbol.asyncIterator)]() {
        for await (const page of this.iterPages()) {
            for (const item of page.getPaginatedItems()) {
                yield item;
            }
        }
    }
}
/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
class PagePromise extends APIPromise {
    constructor(client, request, Page) {
        super(request, async (props) => new Page(client, props.response, await defaultParseResponse(props), props.options));
    }
    /**
     * Allow auto-paginating iteration on an unawaited list call, eg:
     *
     *    for await (const item of client.items.list()) {
     *      console.log(item)
     *    }
     */
    async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
            yield item;
        }
    }
}
const createResponseHeaders = (headers) => {
    return new Proxy(Object.fromEntries(
    // @ts-ignore
    headers.entries()), {
        get(target, name) {
            const key = name.toString();
            return target[key.toLowerCase()] || target[key];
        },
    });
};
// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const requestOptionsKeys = {
    method: true,
    path: true,
    query: true,
    body: true,
    headers: true,
    maxRetries: true,
    stream: true,
    timeout: true,
    httpAgent: true,
    signal: true,
    idempotencyKey: true,
    __binaryResponse: true,
};
const isRequestOptions = (obj) => {
    return (typeof obj === 'object' &&
        obj !== null &&
        !isEmptyObj(obj) &&
        Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k)));
};
const getPlatformProperties = () => {
    if (typeof Deno !== 'undefined' && Deno.build != null) {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': VERSION,
            'X-Stainless-OS': normalizePlatform(Deno.build.os),
            'X-Stainless-Arch': normalizeArch(Deno.build.arch),
            'X-Stainless-Runtime': 'deno',
            'X-Stainless-Runtime-Version': Deno.version,
        };
    }
    if (typeof EdgeRuntime !== 'undefined') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': VERSION,
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': `other:${EdgeRuntime}`,
            'X-Stainless-Runtime': 'edge',
            'X-Stainless-Runtime-Version': process.version,
        };
    }
    // Check if Node.js
    if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': VERSION,
            'X-Stainless-OS': normalizePlatform(process.platform),
            'X-Stainless-Arch': normalizeArch(process.arch),
            'X-Stainless-Runtime': 'node',
            'X-Stainless-Runtime-Version': process.version,
        };
    }
    const browserInfo = getBrowserInfo();
    if (browserInfo) {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': VERSION,
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': 'unknown',
            'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
            'X-Stainless-Runtime-Version': browserInfo.version,
        };
    }
    // TODO add support for Cloudflare workers, etc.
    return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': VERSION,
        'X-Stainless-OS': 'Unknown',
        'X-Stainless-Arch': 'unknown',
        'X-Stainless-Runtime': 'unknown',
        'X-Stainless-Runtime-Version': 'unknown',
    };
};
// Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
function getBrowserInfo() {
    if (typeof navigator === 'undefined' || !navigator) {
        return null;
    }
    // NOTE: The order matters here!
    const browserPatterns = [
        { key: 'edge', pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: 'ie', pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: 'ie', pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: 'chrome', pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: 'firefox', pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
        { key: 'safari', pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ },
    ];
    // Find the FIRST matching browser
    for (const { key, pattern } of browserPatterns) {
        const match = pattern.exec(navigator.userAgent);
        if (match) {
            const major = match[1] || 0;
            const minor = match[2] || 0;
            const patch = match[3] || 0;
            return { browser: key, version: `${major}.${minor}.${patch}` };
        }
    }
    return null;
}
const normalizeArch = (arch) => {
    // Node docs:
    // - https://nodejs.org/api/process.html#processarch
    // Deno docs:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    if (arch === 'x32')
        return 'x32';
    if (arch === 'x86_64' || arch === 'x64')
        return 'x64';
    if (arch === 'arm')
        return 'arm';
    if (arch === 'aarch64' || arch === 'arm64')
        return 'arm64';
    if (arch)
        return `other:${arch}`;
    return 'unknown';
};
const normalizePlatform = (platform) => {
    // Node platforms:
    // - https://nodejs.org/api/process.html#processplatform
    // Deno platforms:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    // - https://github.com/denoland/deno/issues/14799
    platform = platform.toLowerCase();
    // NOTE: this iOS check is untested and may not work
    // Node does not work natively on IOS, there is a fork at
    // https://github.com/nodejs-mobile/nodejs-mobile
    // however it is unknown at the time of writing how to detect if it is running
    if (platform.includes('ios'))
        return 'iOS';
    if (platform === 'android')
        return 'Android';
    if (platform === 'darwin')
        return 'MacOS';
    if (platform === 'win32')
        return 'Windows';
    if (platform === 'freebsd')
        return 'FreeBSD';
    if (platform === 'openbsd')
        return 'OpenBSD';
    if (platform === 'linux')
        return 'Linux';
    if (platform)
        return `Other:${platform}`;
    return 'Unknown';
};
let _platformHeaders;
const getPlatformHeaders = () => {
    return (_platformHeaders ?? (_platformHeaders = getPlatformProperties()));
};
const safeJSON = (text) => {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        return undefined;
    }
};
// https://stackoverflow.com/a/19709846
const startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');
const isAbsoluteURL = (url) => {
    return startsWithSchemeRegexp.test(url);
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const validatePositiveInteger = (name, n) => {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new OpenAIError(`${name} must be an integer`);
    }
    if (n < 0) {
        throw new OpenAIError(`${name} must be a positive integer`);
    }
    return n;
};
const castToError = (err) => {
    if (err instanceof Error)
        return err;
    return new Error(err);
};
/**
 * Read an environment variable.
 *
 * Trims beginning and trailing whitespace.
 *
 * Will return undefined if the environment variable doesn't exist or cannot be accessed.
 */
const readEnv = (env) => {
    if (typeof process !== 'undefined') {
        return process.env?.[env]?.trim() ?? undefined;
    }
    if (typeof Deno !== 'undefined') {
        return Deno.env?.get?.(env)?.trim();
    }
    return undefined;
};
// https://stackoverflow.com/a/34491287
function isEmptyObj(obj) {
    if (!obj)
        return true;
    for (const _k in obj)
        return false;
    return true;
}
// https://eslint.org/docs/latest/rules/no-prototype-builtins
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
/**
 * Copies headers from "newHeaders" onto "targetHeaders",
 * using lower-case for all properties,
 * ignoring any keys with undefined values,
 * and deleting any keys with null values.
 */
function applyHeadersMut(targetHeaders, newHeaders) {
    for (const k in newHeaders) {
        if (!hasOwn(newHeaders, k))
            continue;
        const lowerKey = k.toLowerCase();
        if (!lowerKey)
            continue;
        const val = newHeaders[k];
        if (val === null) {
            delete targetHeaders[lowerKey];
        }
        else if (val !== undefined) {
            targetHeaders[lowerKey] = val;
        }
    }
}
function debug(action, ...args) {
    if (typeof process !== 'undefined' && process.env['DEBUG'] === 'true') {
        console.log(`OpenAI:DEBUG:${action}`, ...args);
    }
}
/**
 * https://stackoverflow.com/a/2117523
 */
const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
const isRunningInBrowser = () => {
    return (
    // @ts-ignore
    typeof window !== 'undefined' &&
        // @ts-ignore
        typeof window.document !== 'undefined' &&
        // @ts-ignore
        typeof navigator !== 'undefined');
};

// File generated from our OpenAPI spec by Stainless.
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class Page extends AbstractPage {
    constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.object = body.object;
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    // @deprecated Please use `nextPageInfo()` instead
    /**
     * This page represents a response that isn't actually paginated at the API level
     * so there will never be any next page params.
     */
    nextPageParams() {
        return null;
    }
    nextPageInfo() {
        return null;
    }
}
class CursorPage extends AbstractPage {
    constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    // @deprecated Please use `nextPageInfo()` instead
    nextPageParams() {
        const info = this.nextPageInfo();
        if (!info)
            return null;
        if ('params' in info)
            return info.params;
        const params = Object.fromEntries(info.url.searchParams);
        if (!Object.keys(params).length)
            return null;
        return params;
    }
    nextPageInfo() {
        const data = this.getPaginatedItems();
        if (!data.length) {
            return null;
        }
        const id = data[data.length - 1]?.id;
        if (!id) {
            return null;
        }
        return { params: { after: id } };
    }
}

// File generated from our OpenAPI spec by Stainless.
class APIResource {
    constructor(client) {
        this._client = client;
    }
}

// File generated from our OpenAPI spec by Stainless.
let Completions$2 = class Completions extends APIResource {
    create(body, options) {
        return this._client.post('/chat/completions', { body, ...options, stream: body.stream ?? false });
    }
};
(function (Completions) {
})(Completions$2 || (Completions$2 = {}));

// File generated from our OpenAPI spec by Stainless.
let Chat$1 = class Chat extends APIResource {
    constructor() {
        super(...arguments);
        this.completions = new Completions$2(this._client);
    }
};
(function (Chat) {
    Chat.Completions = Completions$2;
})(Chat$1 || (Chat$1 = {}));

// File generated from our OpenAPI spec by Stainless.
class Speech extends APIResource {
    /**
     * Generates audio from the input text.
     */
    create(body, options) {
        return this._client.post('/audio/speech', { body, ...options, __binaryResponse: true });
    }
}
(function (Speech) {
})(Speech || (Speech = {}));

// File generated from our OpenAPI spec by Stainless.
class Transcriptions extends APIResource {
    /**
     * Transcribes audio into the input language.
     */
    create(body, options) {
        return this._client.post('/audio/transcriptions', multipartFormRequestOptions({ body, ...options }));
    }
}
(function (Transcriptions) {
})(Transcriptions || (Transcriptions = {}));

// File generated from our OpenAPI spec by Stainless.
class Translations extends APIResource {
    /**
     * Translates audio into English.
     */
    create(body, options) {
        return this._client.post('/audio/translations', multipartFormRequestOptions({ body, ...options }));
    }
}
(function (Translations) {
})(Translations || (Translations = {}));

// File generated from our OpenAPI spec by Stainless.
class Audio extends APIResource {
    constructor() {
        super(...arguments);
        this.transcriptions = new Transcriptions(this._client);
        this.translations = new Translations(this._client);
        this.speech = new Speech(this._client);
    }
}
(function (Audio) {
    Audio.Transcriptions = Transcriptions;
    Audio.Translations = Translations;
    Audio.Speech = Speech;
})(Audio || (Audio = {}));

// File generated from our OpenAPI spec by Stainless.
let Files$2 = class Files extends APIResource {
    /**
     * Create an assistant file by attaching a
     * [File](https://platform.openai.com/docs/api-reference/files) to an
     * [assistant](https://platform.openai.com/docs/api-reference/assistants).
     */
    create(assistantId, body, options) {
        return this._client.post(`/assistants/${assistantId}/files`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Retrieves an AssistantFile.
     */
    retrieve(assistantId, fileId, options) {
        return this._client.get(`/assistants/${assistantId}/files/${fileId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(assistantId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list(assistantId, {}, query);
        }
        return this._client.getAPIList(`/assistants/${assistantId}/files`, AssistantFilesPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Delete an assistant file.
     */
    del(assistantId, fileId, options) {
        return this._client.delete(`/assistants/${assistantId}/files/${fileId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
};
class AssistantFilesPage extends CursorPage {
}
(function (Files) {
    Files.AssistantFilesPage = AssistantFilesPage;
})(Files$2 || (Files$2 = {}));

// File generated from our OpenAPI spec by Stainless.
class Assistants extends APIResource {
    constructor() {
        super(...arguments);
        this.files = new Files$2(this._client);
    }
    /**
     * Create an assistant with a model and instructions.
     */
    create(body, options) {
        return this._client.post('/assistants', {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Retrieves an assistant.
     */
    retrieve(assistantId, options) {
        return this._client.get(`/assistants/${assistantId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Modifies an assistant.
     */
    update(assistantId, body, options) {
        return this._client.post(`/assistants/${assistantId}`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list({}, query);
        }
        return this._client.getAPIList('/assistants', AssistantsPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Delete an assistant.
     */
    del(assistantId, options) {
        return this._client.delete(`/assistants/${assistantId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
}
class AssistantsPage extends CursorPage {
}
(function (Assistants) {
    Assistants.AssistantsPage = AssistantsPage;
    Assistants.Files = Files$2;
    Assistants.AssistantFilesPage = AssistantFilesPage;
})(Assistants || (Assistants = {}));

function isRunnableFunctionWithParse(fn) {
    return typeof fn.parse === 'function';
}

const isAssistantMessage = (message) => {
    return message?.role === 'assistant';
};
const isFunctionMessage = (message) => {
    return message?.role === 'function';
};
const isToolMessage = (message) => {
    return message?.role === 'tool';
};

var __classPrivateFieldSet$1 = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$1 = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractChatCompletionRunner_instances, _AbstractChatCompletionRunner_connectedPromise, _AbstractChatCompletionRunner_resolveConnectedPromise, _AbstractChatCompletionRunner_rejectConnectedPromise, _AbstractChatCompletionRunner_endPromise, _AbstractChatCompletionRunner_resolveEndPromise, _AbstractChatCompletionRunner_rejectEndPromise, _AbstractChatCompletionRunner_listeners, _AbstractChatCompletionRunner_ended, _AbstractChatCompletionRunner_errored, _AbstractChatCompletionRunner_aborted, _AbstractChatCompletionRunner_catchingPromiseCreated, _AbstractChatCompletionRunner_getFinalContent, _AbstractChatCompletionRunner_getFinalMessage, _AbstractChatCompletionRunner_getFinalFunctionCall, _AbstractChatCompletionRunner_getFinalFunctionCallResult, _AbstractChatCompletionRunner_calculateTotalUsage, _AbstractChatCompletionRunner_handleError, _AbstractChatCompletionRunner_validateParams, _AbstractChatCompletionRunner_stringifyFunctionCallResult;
const DEFAULT_MAX_CHAT_COMPLETIONS = 10;
class AbstractChatCompletionRunner {
    constructor() {
        _AbstractChatCompletionRunner_instances.add(this);
        this.controller = new AbortController();
        _AbstractChatCompletionRunner_connectedPromise.set(this, void 0);
        _AbstractChatCompletionRunner_resolveConnectedPromise.set(this, () => { });
        _AbstractChatCompletionRunner_rejectConnectedPromise.set(this, () => { });
        _AbstractChatCompletionRunner_endPromise.set(this, void 0);
        _AbstractChatCompletionRunner_resolveEndPromise.set(this, () => { });
        _AbstractChatCompletionRunner_rejectEndPromise.set(this, () => { });
        _AbstractChatCompletionRunner_listeners.set(this, {});
        this._chatCompletions = [];
        this.messages = [];
        _AbstractChatCompletionRunner_ended.set(this, false);
        _AbstractChatCompletionRunner_errored.set(this, false);
        _AbstractChatCompletionRunner_aborted.set(this, false);
        _AbstractChatCompletionRunner_catchingPromiseCreated.set(this, false);
        _AbstractChatCompletionRunner_handleError.set(this, (error) => {
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_errored, true, "f");
            if (error instanceof Error && error.name === 'AbortError') {
                error = new APIUserAbortError();
            }
            if (error instanceof APIUserAbortError) {
                __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_aborted, true, "f");
                return this._emit('abort', error);
            }
            if (error instanceof OpenAIError) {
                return this._emit('error', error);
            }
            if (error instanceof Error) {
                const openAIError = new OpenAIError(error.message);
                // @ts-ignore
                openAIError.cause = error;
                return this._emit('error', openAIError);
            }
            return this._emit('error', new OpenAIError(String(error)));
        });
        __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_connectedPromise, new Promise((resolve, reject) => {
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_resolveConnectedPromise, resolve, "f");
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_rejectConnectedPromise, reject, "f");
        }), "f");
        __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_endPromise, new Promise((resolve, reject) => {
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_resolveEndPromise, resolve, "f");
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_rejectEndPromise, reject, "f");
        }), "f");
        // Don't let these promises cause unhandled rejection errors.
        // we will manually cause an unhandled rejection error later
        // if the user hasn't registered any error listener or called
        // any promise-returning method.
        __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_connectedPromise, "f").catch(() => { });
        __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_endPromise, "f").catch(() => { });
    }
    _run(executor) {
        // Unfortunately if we call `executor()` immediately we get runtime errors about
        // references to `this` before the `super()` constructor call returns.
        setTimeout(() => {
            executor().then(() => {
                this._emitFinal();
                this._emit('end');
            }, __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_handleError, "f"));
        }, 0);
    }
    _addChatCompletion(chatCompletion) {
        this._chatCompletions.push(chatCompletion);
        this._emit('chatCompletion', chatCompletion);
        const message = chatCompletion.choices[0]?.message;
        if (message)
            this._addMessage(message);
        return chatCompletion;
    }
    _addMessage(message, emit = true) {
        if (!('content' in message))
            message.content = null;
        this.messages.push(message);
        if (emit) {
            this._emit('message', message);
            if ((isFunctionMessage(message) || isToolMessage(message)) && message.content) {
                // Note, this assumes that {role: 'tool', content: …} is always the result of a call of tool of type=function.
                this._emit('functionCallResult', message.content);
            }
            else if (isAssistantMessage(message) && message.function_call) {
                this._emit('functionCall', message.function_call);
            }
            else if (isAssistantMessage(message) && message.tool_calls) {
                for (const tool_call of message.tool_calls) {
                    if (tool_call.type === 'function') {
                        this._emit('functionCall', tool_call.function);
                    }
                }
            }
        }
    }
    _connected() {
        if (this.ended)
            return;
        __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_resolveConnectedPromise, "f").call(this);
        this._emit('connect');
    }
    get ended() {
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_ended, "f");
    }
    get errored() {
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_errored, "f");
    }
    get aborted() {
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_aborted, "f");
    }
    abort() {
        this.controller.abort();
    }
    /**
     * Adds the listener function to the end of the listeners array for the event.
     * No checks are made to see if the listener has already been added. Multiple calls passing
     * the same combination of event and listener will result in the listener being added, and
     * called, multiple times.
     * @returns this ChatCompletionStream, so that calls can be chained
     */
    on(event, listener) {
        const listeners = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event] || (__classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event] = []);
        listeners.push({ listener });
        return this;
    }
    /**
     * Removes the specified listener from the listener array for the event.
     * off() will remove, at most, one instance of a listener from the listener array. If any single
     * listener has been added multiple times to the listener array for the specified event, then
     * off() must be called multiple times to remove each instance.
     * @returns this ChatCompletionStream, so that calls can be chained
     */
    off(event, listener) {
        const listeners = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event];
        if (!listeners)
            return this;
        const index = listeners.findIndex((l) => l.listener === listener);
        if (index >= 0)
            listeners.splice(index, 1);
        return this;
    }
    /**
     * Adds a one-time listener function for the event. The next time the event is triggered,
     * this listener is removed and then invoked.
     * @returns this ChatCompletionStream, so that calls can be chained
     */
    once(event, listener) {
        const listeners = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event] || (__classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event] = []);
        listeners.push({ listener, once: true });
        return this;
    }
    /**
     * This is similar to `.once()`, but returns a Promise that resolves the next time
     * the event is triggered, instead of calling a listener callback.
     * @returns a Promise that resolves the next time given event is triggered,
     * or rejects if an error is emitted.  (If you request the 'error' event,
     * returns a promise that resolves with the error).
     *
     * Example:
     *
     *   const message = await stream.emitted('message') // rejects if the stream errors
     */
    emitted(event) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_catchingPromiseCreated, true, "f");
            if (event !== 'error')
                this.once('error', reject);
            this.once(event, resolve);
        });
    }
    async done() {
        __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_catchingPromiseCreated, true, "f");
        await __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_endPromise, "f");
    }
    /**
     * @returns a promise that resolves with the final ChatCompletion, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
     */
    async finalChatCompletion() {
        await this.done();
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (!completion)
            throw new OpenAIError('stream ended without producing a ChatCompletion');
        return completion;
    }
    /**
     * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */
    async finalContent() {
        await this.done();
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
    }
    /**
     * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
     * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */
    async finalMessage() {
        await this.done();
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
    }
    /**
     * @returns a promise that resolves with the content of the final FunctionCall, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */
    async finalFunctionCall() {
        await this.done();
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
    }
    async finalFunctionCallResult() {
        await this.done();
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
    }
    async totalUsage() {
        await this.done();
        return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
    }
    allChatCompletions() {
        return [...this._chatCompletions];
    }
    _emit(event, ...args) {
        // make sure we don't emit any events after end
        if (__classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_ended, "f")) {
            return;
        }
        if (event === 'end') {
            __classPrivateFieldSet$1(this, _AbstractChatCompletionRunner_ended, true, "f");
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_resolveEndPromise, "f").call(this);
        }
        const listeners = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event];
        if (listeners) {
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_listeners, "f")[event] = listeners.filter((l) => !l.once);
            listeners.forEach(({ listener }) => listener(...args));
        }
        if (event === 'abort') {
            const error = args[0];
            if (!__classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_catchingPromiseCreated, "f") && !listeners?.length) {
                Promise.reject(error);
            }
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_rejectConnectedPromise, "f").call(this, error);
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_rejectEndPromise, "f").call(this, error);
            this._emit('end');
            return;
        }
        if (event === 'error') {
            // NOTE: _emit('error', error) should only be called from #handleError().
            const error = args[0];
            if (!__classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_catchingPromiseCreated, "f") && !listeners?.length) {
                // Trigger an unhandled rejection if the user hasn't registered any error handlers.
                // If you are seeing stack traces here, make sure to handle errors via either:
                // - runner.on('error', () => ...)
                // - await runner.done()
                // - await runner.finalChatCompletion()
                // - etc.
                Promise.reject(error);
            }
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_rejectConnectedPromise, "f").call(this, error);
            __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_rejectEndPromise, "f").call(this, error);
            this._emit('end');
        }
    }
    _emitFinal() {
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (completion)
            this._emit('finalChatCompletion', completion);
        const finalMessage = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
        if (finalMessage)
            this._emit('finalMessage', finalMessage);
        const finalContent = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
        if (finalContent)
            this._emit('finalContent', finalContent);
        const finalFunctionCall = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
        if (finalFunctionCall)
            this._emit('finalFunctionCall', finalFunctionCall);
        const finalFunctionCallResult = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
        if (finalFunctionCallResult != null)
            this._emit('finalFunctionCallResult', finalFunctionCallResult);
        if (this._chatCompletions.some((c) => c.usage)) {
            this._emit('totalUsage', __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
        }
    }
    async _createChatCompletion(completions, params, options) {
        const signal = options?.signal;
        if (signal) {
            if (signal.aborted)
                this.controller.abort();
            signal.addEventListener('abort', () => this.controller.abort());
        }
        __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
        const chatCompletion = await completions.create({ ...params, stream: false }, { ...options, signal: this.controller.signal });
        this._connected();
        return this._addChatCompletion(chatCompletion);
    }
    async _runChatCompletion(completions, params, options) {
        for (const message of params.messages) {
            this._addMessage(message, false);
        }
        return await this._createChatCompletion(completions, params, options);
    }
    async _runFunctions(completions, params, options) {
        const role = 'function';
        const { function_call = 'auto', stream, ...restParams } = params;
        const singleFunctionToCall = typeof function_call !== 'string' && function_call?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const functionsByName = {};
        for (const f of params.functions) {
            functionsByName[f.name || f.function.name] = f;
        }
        const functions = params.functions.map((f) => ({
            name: f.name || f.function.name,
            parameters: f.parameters,
            description: f.description,
        }));
        for (const message of params.messages) {
            this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
            const chatCompletion = await this._createChatCompletion(completions, {
                ...restParams,
                function_call,
                functions,
                messages: [...this.messages],
            }, options);
            const message = chatCompletion.choices[0]?.message;
            if (!message) {
                throw new OpenAIError(`missing message in ChatCompletion response`);
            }
            if (!message.function_call)
                return;
            const { name, arguments: args } = message.function_call;
            const fn = functionsByName[name];
            if (!fn) {
                const content = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions
                    .map((f) => JSON.stringify(f.name))
                    .join(', ')}. Please try again`;
                this._addMessage({ role, name, content });
                continue;
            }
            else if (singleFunctionToCall && singleFunctionToCall !== name) {
                const content = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
                this._addMessage({ role, name, content });
                continue;
            }
            let parsed;
            try {
                parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
            }
            catch (error) {
                this._addMessage({
                    role,
                    name,
                    content: error instanceof Error ? error.message : String(error),
                });
                continue;
            }
            // @ts-expect-error it can't rule out `never` type.
            const rawContent = await fn.function(parsed, this);
            const content = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
            this._addMessage({ role, name, content });
            if (singleFunctionToCall)
                return;
        }
    }
    async _runTools(completions, params, options) {
        const role = 'tool';
        const { tool_choice = 'auto', stream, ...restParams } = params;
        const singleFunctionToCall = typeof tool_choice !== 'string' && tool_choice?.function?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const functionsByName = {};
        for (const f of params.tools) {
            if (f.type === 'function') {
                functionsByName[f.function.name || f.function.function.name] = f.function;
            }
        }
        const tools = 'tools' in params ?
            params.tools.map((t) => t.type === 'function' ?
                {
                    type: 'function',
                    function: {
                        name: t.function.name || t.function.function.name,
                        parameters: t.function.parameters,
                        description: t.function.description,
                    },
                }
                : t)
            : undefined;
        for (const message of params.messages) {
            this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
            const chatCompletion = await this._createChatCompletion(completions, {
                ...restParams,
                tool_choice,
                tools,
                messages: [...this.messages],
            }, options);
            const message = chatCompletion.choices[0]?.message;
            if (!message) {
                throw new OpenAIError(`missing message in ChatCompletion response`);
            }
            if (!message.tool_calls) {
                return;
            }
            for (const tool_call of message.tool_calls) {
                if (tool_call.type !== 'function')
                    continue;
                const tool_call_id = tool_call.id;
                const { name, arguments: args } = tool_call.function;
                const fn = functionsByName[name];
                if (!fn) {
                    const content = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${tools
                        .map((f) => JSON.stringify(f.function.name))
                        .join(', ')}. Please try again`;
                    this._addMessage({ role, tool_call_id, content });
                    continue;
                }
                else if (singleFunctionToCall && singleFunctionToCall !== name) {
                    const content = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
                    this._addMessage({ role, tool_call_id, content });
                    continue;
                }
                let parsed;
                try {
                    parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
                }
                catch (error) {
                    const content = error instanceof Error ? error.message : String(error);
                    this._addMessage({ role, tool_call_id, content });
                    continue;
                }
                // @ts-expect-error it can't rule out `never` type.
                const rawContent = await fn.function(parsed, this);
                const content = __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
                this._addMessage({ role, tool_call_id, content });
                if (singleFunctionToCall) {
                    return;
                }
            }
        }
        return;
    }
}
_AbstractChatCompletionRunner_connectedPromise = new WeakMap(), _AbstractChatCompletionRunner_resolveConnectedPromise = new WeakMap(), _AbstractChatCompletionRunner_rejectConnectedPromise = new WeakMap(), _AbstractChatCompletionRunner_endPromise = new WeakMap(), _AbstractChatCompletionRunner_resolveEndPromise = new WeakMap(), _AbstractChatCompletionRunner_rejectEndPromise = new WeakMap(), _AbstractChatCompletionRunner_listeners = new WeakMap(), _AbstractChatCompletionRunner_ended = new WeakMap(), _AbstractChatCompletionRunner_errored = new WeakMap(), _AbstractChatCompletionRunner_aborted = new WeakMap(), _AbstractChatCompletionRunner_catchingPromiseCreated = new WeakMap(), _AbstractChatCompletionRunner_handleError = new WeakMap(), _AbstractChatCompletionRunner_instances = new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent() {
    return __classPrivateFieldGet$1(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
}, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage() {
    let i = this.messages.length;
    while (i-- > 0) {
        const message = this.messages[i];
        if (isAssistantMessage(message)) {
            return { ...message, content: message.content ?? null };
        }
    }
    throw new OpenAIError('stream ended without producing a ChatCompletionMessage with role=assistant');
}, _AbstractChatCompletionRunner_getFinalFunctionCall = function _AbstractChatCompletionRunner_getFinalFunctionCall() {
    for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isAssistantMessage(message) && message?.function_call) {
            return message.function_call;
        }
        if (isAssistantMessage(message) && message?.tool_calls?.length) {
            return message.tool_calls.at(-1)?.function;
        }
    }
    return;
}, _AbstractChatCompletionRunner_getFinalFunctionCallResult = function _AbstractChatCompletionRunner_getFinalFunctionCallResult() {
    for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isFunctionMessage(message) && message.content != null) {
            return message.content;
        }
        if (isToolMessage(message) &&
            message.content != null &&
            this.messages.some((x) => x.role === 'assistant' &&
                x.tool_calls?.some((y) => y.type === 'function' && y.id === message.tool_call_id))) {
            return message.content;
        }
    }
    return;
}, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage() {
    const total = {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0,
    };
    for (const { usage } of this._chatCompletions) {
        if (usage) {
            total.completion_tokens += usage.completion_tokens;
            total.prompt_tokens += usage.prompt_tokens;
            total.total_tokens += usage.total_tokens;
        }
    }
    return total;
}, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams(params) {
    if (params.n != null && params.n > 1) {
        throw new OpenAIError('ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.');
    }
}, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult(rawContent) {
    return (typeof rawContent === 'string' ? rawContent
        : rawContent === undefined ? 'undefined'
            : JSON.stringify(rawContent));
};

class ChatCompletionRunner extends AbstractChatCompletionRunner {
    /** @deprecated - please use `runTools` instead. */
    static runFunctions(completions, params, options) {
        const runner = new ChatCompletionRunner();
        const opts = {
            ...options,
            headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'runFunctions' },
        };
        runner._run(() => runner._runFunctions(completions, params, opts));
        return runner;
    }
    static runTools(completions, params, options) {
        const runner = new ChatCompletionRunner();
        const opts = {
            ...options,
            headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'runTools' },
        };
        runner._run(() => runner._runTools(completions, params, opts));
        return runner;
    }
    _addMessage(message) {
        super._addMessage(message);
        if (isAssistantMessage(message) && message.content) {
            this._emit('content', message.content);
        }
    }
}

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ChatCompletionStream_instances, _ChatCompletionStream_currentChatCompletionSnapshot, _ChatCompletionStream_beginRequest, _ChatCompletionStream_addChunk, _ChatCompletionStream_endRequest, _ChatCompletionStream_accumulateChatCompletion;
class ChatCompletionStream extends AbstractChatCompletionRunner {
    constructor() {
        super(...arguments);
        _ChatCompletionStream_instances.add(this);
        _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
    }
    get currentChatCompletionSnapshot() {
        return __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    }
    /**
     * Intended for use on the frontend, consuming a stream produced with
     * `.toReadableStream()` on the backend.
     *
     * Note that messages sent to the model do not appear in `.on('message')`
     * in this context.
     */
    static fromReadableStream(stream) {
        const runner = new ChatCompletionStream();
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
    }
    static createChatCompletion(completions, params, options) {
        const runner = new ChatCompletionStream();
        runner._run(() => runner._runChatCompletion(completions, { ...params, stream: true }, { ...options, headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'stream' } }));
        return runner;
    }
    async _createChatCompletion(completions, params, options) {
        const signal = options?.signal;
        if (signal) {
            if (signal.aborted)
                this.controller.abort();
            signal.addEventListener('abort', () => this.controller.abort());
        }
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        const stream = await completions.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const chunk of stream) {
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
        }
        if (stream.controller.signal?.aborted) {
            throw new APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
    }
    async _fromReadableStream(readableStream, options) {
        const signal = options?.signal;
        if (signal) {
            if (signal.aborted)
                this.controller.abort();
            signal.addEventListener('abort', () => this.controller.abort());
        }
        __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        let chatId;
        for await (const chunk of stream) {
            if (chatId && chatId !== chunk.id) {
                // A new request has been made.
                this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
            }
            __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
            chatId = chunk.id;
        }
        if (stream.controller.signal?.aborted) {
            throw new APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
    }
    [(_ChatCompletionStream_currentChatCompletionSnapshot = new WeakMap(), _ChatCompletionStream_instances = new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest() {
        if (this.ended)
            return;
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, undefined, "f");
    }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk(chunk) {
        if (this.ended)
            return;
        const completion = __classPrivateFieldGet(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
        this._emit('chunk', chunk, completion);
        const delta = chunk.choices[0]?.delta?.content;
        const snapshot = completion.choices[0]?.message;
        if (delta != null && snapshot?.role === 'assistant' && snapshot?.content) {
            this._emit('content', delta, snapshot.content);
        }
    }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest() {
        if (this.ended) {
            throw new OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        if (!snapshot) {
            throw new OpenAIError(`request ended without sending any chunks`);
        }
        __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, undefined, "f");
        return finalizeChatCompletion(snapshot);
    }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion(chunk) {
        var _a, _b, _c;
        let snapshot = __classPrivateFieldGet(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        const { choices, ...rest } = chunk;
        if (!snapshot) {
            snapshot = __classPrivateFieldSet(this, _ChatCompletionStream_currentChatCompletionSnapshot, {
                ...rest,
                choices: [],
            }, "f");
        }
        else {
            Object.assign(snapshot, rest);
        }
        for (const { delta, finish_reason, index, logprobs = null, ...other } of chunk.choices) {
            let choice = snapshot.choices[index];
            if (!choice) {
                snapshot.choices[index] = { finish_reason, index, message: delta, logprobs, ...other };
                continue;
            }
            if (logprobs) {
                if (!choice.logprobs) {
                    choice.logprobs = logprobs;
                }
                else if (logprobs.content) {
                    (_a = choice.logprobs).content ?? (_a.content = []);
                    choice.logprobs.content.push(...logprobs.content);
                }
            }
            if (finish_reason)
                choice.finish_reason = finish_reason;
            Object.assign(choice, other);
            if (!delta)
                continue; // Shouldn't happen; just in case.
            const { content, function_call, role, tool_calls } = delta;
            if (content)
                choice.message.content = (choice.message.content || '') + content;
            if (role)
                choice.message.role = role;
            if (function_call) {
                if (!choice.message.function_call) {
                    choice.message.function_call = function_call;
                }
                else {
                    if (function_call.name)
                        choice.message.function_call.name = function_call.name;
                    if (function_call.arguments) {
                        (_b = choice.message.function_call).arguments ?? (_b.arguments = '');
                        choice.message.function_call.arguments += function_call.arguments;
                    }
                }
            }
            if (tool_calls) {
                if (!choice.message.tool_calls)
                    choice.message.tool_calls = [];
                for (const { index, id, type, function: fn } of tool_calls) {
                    const tool_call = ((_c = choice.message.tool_calls)[index] ?? (_c[index] = {}));
                    if (id)
                        tool_call.id = id;
                    if (type)
                        tool_call.type = type;
                    if (fn)
                        tool_call.function ?? (tool_call.function = { arguments: '' });
                    if (fn?.name)
                        tool_call.function.name = fn.name;
                    if (fn?.arguments)
                        tool_call.function.arguments += fn.arguments;
                }
            }
        }
        return snapshot;
    }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on('chunk', (chunk) => {
            const reader = readQueue.shift();
            if (reader) {
                reader(chunk);
            }
            else {
                pushQueue.push(chunk);
            }
        });
        this.on('end', () => {
            done = true;
            for (const reader of readQueue) {
                reader(undefined);
            }
            readQueue.length = 0;
        });
        return {
            next: async () => {
                if (!pushQueue.length) {
                    if (done) {
                        return { value: undefined, done: true };
                    }
                    return new Promise((resolve) => readQueue.push(resolve)).then((chunk) => (chunk ? { value: chunk, done: false } : { value: undefined, done: true }));
                }
                const chunk = pushQueue.shift();
                return { value: chunk, done: false };
            },
        };
    }
    toReadableStream() {
        const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
    }
}
function finalizeChatCompletion(snapshot) {
    const { id, choices, created, model } = snapshot;
    return {
        id,
        choices: choices.map(({ message, finish_reason, index, logprobs }) => {
            if (!finish_reason)
                throw new OpenAIError(`missing finish_reason for choice ${index}`);
            const { content = null, function_call, tool_calls } = message;
            const role = message.role; // this is what we expect; in theory it could be different which would make our types a slight lie but would be fine.
            if (!role)
                throw new OpenAIError(`missing role for choice ${index}`);
            if (function_call) {
                const { arguments: args, name } = function_call;
                if (args == null)
                    throw new OpenAIError(`missing function_call.arguments for choice ${index}`);
                if (!name)
                    throw new OpenAIError(`missing function_call.name for choice ${index}`);
                return {
                    message: { content, function_call: { arguments: args, name }, role },
                    finish_reason,
                    index,
                    logprobs,
                };
            }
            if (tool_calls) {
                return {
                    index,
                    finish_reason,
                    logprobs,
                    message: {
                        role,
                        content,
                        tool_calls: tool_calls.map((tool_call, i) => {
                            const { function: fn, type, id } = tool_call;
                            const { arguments: args, name } = fn || {};
                            if (id == null)
                                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].id\n${str(snapshot)}`);
                            if (type == null)
                                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].type\n${str(snapshot)}`);
                            if (name == null)
                                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name\n${str(snapshot)}`);
                            if (args == null)
                                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments\n${str(snapshot)}`);
                            return { id, type, function: { name, arguments: args } };
                        }),
                    },
                };
            }
            return { message: { content: content, role }, finish_reason, index, logprobs };
        }),
        created,
        model,
        object: 'chat.completion',
    };
}
function str(x) {
    return JSON.stringify(x);
}

class ChatCompletionStreamingRunner extends ChatCompletionStream {
    static fromReadableStream(stream) {
        const runner = new ChatCompletionStreamingRunner();
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
    }
    /** @deprecated - please use `runTools` instead. */
    static runFunctions(completions, params, options) {
        const runner = new ChatCompletionStreamingRunner();
        const opts = {
            ...options,
            headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'runFunctions' },
        };
        runner._run(() => runner._runFunctions(completions, params, opts));
        return runner;
    }
    static runTools(completions, params, options) {
        const runner = new ChatCompletionStreamingRunner();
        const opts = {
            ...options,
            headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'runTools' },
        };
        runner._run(() => runner._runTools(completions, params, opts));
        return runner;
    }
}

// File generated from our OpenAPI spec by Stainless.
let Completions$1 = class Completions extends APIResource {
    runFunctions(body, options) {
        if (body.stream) {
            return ChatCompletionStreamingRunner.runFunctions(this._client.chat.completions, body, options);
        }
        return ChatCompletionRunner.runFunctions(this._client.chat.completions, body, options);
    }
    runTools(body, options) {
        if (body.stream) {
            return ChatCompletionStreamingRunner.runTools(this._client.chat.completions, body, options);
        }
        return ChatCompletionRunner.runTools(this._client.chat.completions, body, options);
    }
    /**
     * Creates a chat completion stream
     */
    stream(body, options) {
        return ChatCompletionStream.createChatCompletion(this._client.chat.completions, body, options);
    }
};

// File generated from our OpenAPI spec by Stainless.
class Chat extends APIResource {
    constructor() {
        super(...arguments);
        this.completions = new Completions$1(this._client);
    }
}
(function (Chat) {
    Chat.Completions = Completions$1;
})(Chat || (Chat = {}));

// File generated from our OpenAPI spec by Stainless.
let Files$1 = class Files extends APIResource {
    /**
     * Retrieves a message file.
     */
    retrieve(threadId, messageId, fileId, options) {
        return this._client.get(`/threads/${threadId}/messages/${messageId}/files/${fileId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(threadId, messageId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list(threadId, messageId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/messages/${messageId}/files`, MessageFilesPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
};
class MessageFilesPage extends CursorPage {
}
(function (Files) {
    Files.MessageFilesPage = MessageFilesPage;
})(Files$1 || (Files$1 = {}));

// File generated from our OpenAPI spec by Stainless.
class Messages extends APIResource {
    constructor() {
        super(...arguments);
        this.files = new Files$1(this._client);
    }
    /**
     * Create a message.
     */
    create(threadId, body, options) {
        return this._client.post(`/threads/${threadId}/messages`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Retrieve a message.
     */
    retrieve(threadId, messageId, options) {
        return this._client.get(`/threads/${threadId}/messages/${messageId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Modifies a message.
     */
    update(threadId, messageId, body, options) {
        return this._client.post(`/threads/${threadId}/messages/${messageId}`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(threadId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/messages`, ThreadMessagesPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
}
class ThreadMessagesPage extends CursorPage {
}
(function (Messages) {
    Messages.ThreadMessagesPage = ThreadMessagesPage;
    Messages.Files = Files$1;
    Messages.MessageFilesPage = MessageFilesPage;
})(Messages || (Messages = {}));

// File generated from our OpenAPI spec by Stainless.
class Steps extends APIResource {
    /**
     * Retrieves a run step.
     */
    retrieve(threadId, runId, stepId, options) {
        return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(threadId, runId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list(threadId, runId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs/${runId}/steps`, RunStepsPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
}
class RunStepsPage extends CursorPage {
}
(function (Steps) {
    Steps.RunStepsPage = RunStepsPage;
})(Steps || (Steps = {}));

// File generated from our OpenAPI spec by Stainless.
class Runs extends APIResource {
    constructor() {
        super(...arguments);
        this.steps = new Steps(this._client);
    }
    /**
     * Create a run.
     */
    create(threadId, body, options) {
        return this._client.post(`/threads/${threadId}/runs`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Retrieves a run.
     */
    retrieve(threadId, runId, options) {
        return this._client.get(`/threads/${threadId}/runs/${runId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Modifies a run.
     */
    update(threadId, runId, body, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    list(threadId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs`, RunsPage, {
            query,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Cancels a run that is `in_progress`.
     */
    cancel(threadId, runId, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * When a run has the `status: "requires_action"` and `required_action.type` is
     * `submit_tool_outputs`, this endpoint can be used to submit the outputs from the
     * tool calls once they're all completed. All outputs must be submitted in a single
     * request.
     */
    submitToolOutputs(threadId, runId, body, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
}
class RunsPage extends CursorPage {
}
(function (Runs) {
    Runs.RunsPage = RunsPage;
    Runs.Steps = Steps;
    Runs.RunStepsPage = RunStepsPage;
})(Runs || (Runs = {}));

// File generated from our OpenAPI spec by Stainless.
class Threads extends APIResource {
    constructor() {
        super(...arguments);
        this.runs = new Runs(this._client);
        this.messages = new Messages(this._client);
    }
    create(body = {}, options) {
        if (isRequestOptions(body)) {
            return this.create({}, body);
        }
        return this._client.post('/threads', {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Retrieves a thread.
     */
    retrieve(threadId, options) {
        return this._client.get(`/threads/${threadId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Modifies a thread.
     */
    update(threadId, body, options) {
        return this._client.post(`/threads/${threadId}`, {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Delete a thread.
     */
    del(threadId, options) {
        return this._client.delete(`/threads/${threadId}`, {
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
    /**
     * Create a thread and run it in one request.
     */
    createAndRun(body, options) {
        return this._client.post('/threads/runs', {
            body,
            ...options,
            headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
        });
    }
}
(function (Threads) {
    Threads.Runs = Runs;
    Threads.RunsPage = RunsPage;
    Threads.Messages = Messages;
    Threads.ThreadMessagesPage = ThreadMessagesPage;
})(Threads || (Threads = {}));

// File generated from our OpenAPI spec by Stainless.
class Beta extends APIResource {
    constructor() {
        super(...arguments);
        this.chat = new Chat(this._client);
        this.assistants = new Assistants(this._client);
        this.threads = new Threads(this._client);
    }
}
(function (Beta) {
    Beta.Chat = Chat;
    Beta.Assistants = Assistants;
    Beta.AssistantsPage = AssistantsPage;
    Beta.Threads = Threads;
})(Beta || (Beta = {}));

// File generated from our OpenAPI spec by Stainless.
class Completions extends APIResource {
    create(body, options) {
        return this._client.post('/completions', { body, ...options, stream: body.stream ?? false });
    }
}
(function (Completions) {
})(Completions || (Completions = {}));

// File generated from our OpenAPI spec by Stainless.
class Embeddings extends APIResource {
    /**
     * Creates an embedding vector representing the input text.
     */
    create(body, options) {
        return this._client.post('/embeddings', { body, ...options });
    }
}
(function (Embeddings) {
})(Embeddings || (Embeddings = {}));

// File generated from our OpenAPI spec by Stainless.
class Files extends APIResource {
    /**
     * Upload a file that can be used across various endpoints. The size of all the
     * files uploaded by one organization can be up to 100 GB.
     *
     * The size of individual files can be a maximum of 512 MB or 2 million tokens for
     * Assistants. See the
     * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) to
     * learn more about the types of files supported. The Fine-tuning API only supports
     * `.jsonl` files.
     *
     * Please [contact us](https://help.openai.com/) if you need to increase these
     * storage limits.
     */
    create(body, options) {
        return this._client.post('/files', multipartFormRequestOptions({ body, ...options }));
    }
    /**
     * Returns information about a specific file.
     */
    retrieve(fileId, options) {
        return this._client.get(`/files/${fileId}`, options);
    }
    list(query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list({}, query);
        }
        return this._client.getAPIList('/files', FileObjectsPage, { query, ...options });
    }
    /**
     * Delete a file.
     */
    del(fileId, options) {
        return this._client.delete(`/files/${fileId}`, options);
    }
    /**
     * Returns the contents of the specified file.
     */
    content(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, { ...options, __binaryResponse: true });
    }
    /**
     * Returns the contents of the specified file.
     *
     * @deprecated The `.content()` method should be used instead
     */
    retrieveContent(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, {
            ...options,
            headers: { Accept: 'application/json', ...options?.headers },
        });
    }
    /**
     * Waits for the given file to be processed, default timeout is 30 mins.
     */
    async waitForProcessing(id, { pollInterval = 5000, maxWait = 30 * 60 * 1000 } = {}) {
        const TERMINAL_STATES = new Set(['processed', 'error', 'deleted']);
        const start = Date.now();
        let file = await this.retrieve(id);
        while (!file.status || !TERMINAL_STATES.has(file.status)) {
            await sleep(pollInterval);
            file = await this.retrieve(id);
            if (Date.now() - start > maxWait) {
                throw new APIConnectionTimeoutError({
                    message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`,
                });
            }
        }
        return file;
    }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class FileObjectsPage extends Page {
}
(function (Files) {
    Files.FileObjectsPage = FileObjectsPage;
})(Files || (Files = {}));

// File generated from our OpenAPI spec by Stainless.
class Jobs extends APIResource {
    /**
     * Creates a fine-tuning job which begins the process of creating a new model from
     * a given dataset.
     *
     * Response includes details of the enqueued job including job status and the name
     * of the fine-tuned models once complete.
     *
     * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
     */
    create(body, options) {
        return this._client.post('/fine_tuning/jobs', { body, ...options });
    }
    /**
     * Get info about a fine-tuning job.
     *
     * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
     */
    retrieve(fineTuningJobId, options) {
        return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
    }
    list(query = {}, options) {
        if (isRequestOptions(query)) {
            return this.list({}, query);
        }
        return this._client.getAPIList('/fine_tuning/jobs', FineTuningJobsPage, { query, ...options });
    }
    /**
     * Immediately cancel a fine-tune job.
     */
    cancel(fineTuningJobId, options) {
        return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
    }
    listEvents(fineTuningJobId, query = {}, options) {
        if (isRequestOptions(query)) {
            return this.listEvents(fineTuningJobId, {}, query);
        }
        return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, {
            query,
            ...options,
        });
    }
}
class FineTuningJobsPage extends CursorPage {
}
class FineTuningJobEventsPage extends CursorPage {
}
(function (Jobs) {
    Jobs.FineTuningJobsPage = FineTuningJobsPage;
    Jobs.FineTuningJobEventsPage = FineTuningJobEventsPage;
})(Jobs || (Jobs = {}));

// File generated from our OpenAPI spec by Stainless.
class FineTuning extends APIResource {
    constructor() {
        super(...arguments);
        this.jobs = new Jobs(this._client);
    }
}
(function (FineTuning) {
    FineTuning.Jobs = Jobs;
    FineTuning.FineTuningJobsPage = FineTuningJobsPage;
    FineTuning.FineTuningJobEventsPage = FineTuningJobEventsPage;
})(FineTuning || (FineTuning = {}));

// File generated from our OpenAPI spec by Stainless.
class Images extends APIResource {
    /**
     * Creates a variation of a given image.
     */
    createVariation(body, options) {
        return this._client.post('/images/variations', multipartFormRequestOptions({ body, ...options }));
    }
    /**
     * Creates an edited or extended image given an original image and a prompt.
     */
    edit(body, options) {
        return this._client.post('/images/edits', multipartFormRequestOptions({ body, ...options }));
    }
    /**
     * Creates an image given a prompt.
     */
    generate(body, options) {
        return this._client.post('/images/generations', { body, ...options });
    }
}
(function (Images) {
})(Images || (Images = {}));

// File generated from our OpenAPI spec by Stainless.
class Models extends APIResource {
    /**
     * Retrieves a model instance, providing basic information about the model such as
     * the owner and permissioning.
     */
    retrieve(model, options) {
        return this._client.get(`/models/${model}`, options);
    }
    /**
     * Lists the currently available models, and provides basic information about each
     * one such as the owner and availability.
     */
    list(options) {
        return this._client.getAPIList('/models', ModelsPage, options);
    }
    /**
     * Delete a fine-tuned model. You must have the Owner role in your organization to
     * delete a model.
     */
    del(model, options) {
        return this._client.delete(`/models/${model}`, options);
    }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class ModelsPage extends Page {
}
(function (Models) {
    Models.ModelsPage = ModelsPage;
})(Models || (Models = {}));

// File generated from our OpenAPI spec by Stainless.
class Moderations extends APIResource {
    /**
     * Classifies if text violates OpenAI's Content Policy
     */
    create(body, options) {
        return this._client.post('/moderations', { body, ...options });
    }
}
(function (Moderations) {
})(Moderations || (Moderations = {}));

// File generated from our OpenAPI spec by Stainless.
var _a;
/** API Client for interfacing with the OpenAI API. */
class OpenAI extends APIClient {
    /**
     * API Client for interfacing with the OpenAI API.
     *
     * @param {string} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
     * @param {string | null} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
     * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */
    constructor({ baseURL = readEnv('OPENAI_BASE_URL'), apiKey = readEnv('OPENAI_API_KEY'), organization = readEnv('OPENAI_ORG_ID') ?? null, ...opts } = {}) {
        if (apiKey === undefined) {
            throw new OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
        }
        const options = {
            apiKey,
            organization,
            ...opts,
            baseURL: baseURL || `https://api.openai.com/v1`,
        };
        if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
            throw new OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
        }
        super({
            baseURL: options.baseURL,
            timeout: options.timeout ?? 600000 /* 10 minutes */,
            httpAgent: options.httpAgent,
            maxRetries: options.maxRetries,
            fetch: options.fetch,
        });
        this.completions = new Completions(this);
        this.chat = new Chat$1(this);
        this.embeddings = new Embeddings(this);
        this.files = new Files(this);
        this.images = new Images(this);
        this.audio = new Audio(this);
        this.moderations = new Moderations(this);
        this.models = new Models(this);
        this.fineTuning = new FineTuning(this);
        this.beta = new Beta(this);
        this._options = options;
        this.apiKey = apiKey;
        this.organization = organization;
    }
    defaultQuery() {
        return this._options.defaultQuery;
    }
    defaultHeaders(opts) {
        return {
            ...super.defaultHeaders(opts),
            'OpenAI-Organization': this.organization,
            ...this._options.defaultHeaders,
        };
    }
    authHeaders(opts) {
        return { Authorization: `Bearer ${this.apiKey}` };
    }
}
_a = OpenAI;
OpenAI.OpenAI = _a;
OpenAI.OpenAIError = OpenAIError;
OpenAI.APIError = APIError;
OpenAI.APIConnectionError = APIConnectionError;
OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
OpenAI.APIUserAbortError = APIUserAbortError;
OpenAI.NotFoundError = NotFoundError;
OpenAI.ConflictError = ConflictError;
OpenAI.RateLimitError = RateLimitError;
OpenAI.BadRequestError = BadRequestError;
OpenAI.AuthenticationError = AuthenticationError;
OpenAI.InternalServerError = InternalServerError;
OpenAI.PermissionDeniedError = PermissionDeniedError;
OpenAI.UnprocessableEntityError = UnprocessableEntityError;
(function (OpenAI) {
    // Helper functions
    OpenAI.toFile = toFile;
    OpenAI.fileFromPath = fileFromPath;
    OpenAI.Page = Page;
    OpenAI.CursorPage = CursorPage;
    OpenAI.Completions = Completions;
    OpenAI.Chat = Chat$1;
    OpenAI.Embeddings = Embeddings;
    OpenAI.Files = Files;
    OpenAI.FileObjectsPage = FileObjectsPage;
    OpenAI.Images = Images;
    OpenAI.Audio = Audio;
    OpenAI.Moderations = Moderations;
    OpenAI.Models = Models;
    OpenAI.ModelsPage = ModelsPage;
    OpenAI.FineTuning = FineTuning;
    OpenAI.Beta = Beta;
})(OpenAI || (OpenAI = {}));
var OpenAI$1 = OpenAI;

let openai;
const getOpenAiInstance = () => {
        if (openai) {
            return openai;
        }
        else {
            const state = window.craftercms.getStore().getState();
            const siteId = state.sites.active;
            const authoringBase = state.env.authoringBase;
            const baseOptions = { maxRetries: 0, dangerouslyAllowBrowser: true };
            const headers = window.craftercms.utils.ajax.getGlobalHeaders() ?? {};
            return (openai = new OpenAI$1({
                ...baseOptions,
                // When we have a working proxy service....
                // apiKey: null,
                // baseURL: `${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/v1/proxy?siteId=${siteId}`
                // Meanwhile...
                apiKey: null,
                // Retrieves the key when first invoked. Then caches it.
                fetch: async (url, init) => fetch(`${authoringBase}/api/2/plugin/script/plugins/org/craftercms/openai/key?siteId=${siteId}`, {
                    headers
                })
                    .then((response) => response.json())
                    .then((response) => {
                    init.headers['authorization'] = `Bearer ${response.result}`;
                    openai = new OpenAI$1({ ...baseOptions, apiKey: response.result });
                    return fetch(url, init);
                })
            }));
        }
    };
function createChatCompletion(body, options) {
    return getOpenAiInstance().chat.completions.create(body, {
        ...options,
        headers: {
            ...options?.headers,
            Accept: body.stream ? 'text/event-stream' : 'application/json'
        }
    });
}
function createUsername(user) {
    const { firstName, lastName, username } = user;
    return `${firstName} ${lastName}`.trim() || username;
}

const StyledBox = styled(Box)(
// language=CSS
({ theme }) => `
  max-width: 100%;
  margin: 0;
  font-family: ${theme.typography.fontFamily};
  display: flex;
  /*background-color: ${theme.palette.background.paper};*/
  padding: ${theme.spacing(2)};`);
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
  flex: 1;`);
const StyledAvatar = styled(Avatar)(
// language=CSS
({ theme }) => `
    margin-right: ${theme.spacing(1)};
    flexShrink: 0;
  `);
const StyledIframe = styled('iframe')(
// language=CSS
() => `
    width: 100%;
    background-color: transparent;
    border: none;
  `);
function createSrcDoc(html, theme) {
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
function copyToClipboard(textToCopy) {
    // Clipboard is only available on user-initiated callbacks over non-secure contexts (e.g. not https).
    return (navigator.clipboard?.writeText(textToCopy) ??
        new Promise((resolve, reject) => reject('Copying to clipboard is only available in secure contexts or user-initiated callbacks.')));
}
function stringToColor(string) {
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
function nameToInitials(name) {
    const parts = name.split(' ');
    const initials = parts.map((part) => part.charAt(0).toUpperCase());
    return initials.join('');
}
function ChatGPT(props) {
    // region const { ... } = props;
    const { sxs, model = 'gpt-4', userName, scrollToReply = true, initialMessages, aiAvatarColour = '#19c37d', extraActions, emptyStateOptions = [
        {
            id: 'useCasualTone',
            title: 'Set a casual tone for the AI content',
            subheader: 'e.g. Ready to chat about anything you like!',
            messages: [
                {
                    role: 'system',
                    content: 'Answer upcoming questions using casual, informal language to convey a casual conversation with a real person. Confirm and ask the user for a prompt to begin working'
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
                    content: 'Answers upcoming questions using polished, formal, and respectful language to convey professional expertise and competence. Acknowledge and ask the user for a prompt to begin working'
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
    ], onExtraActionClick, onEmptyStateOptionClick = (e, option, api) => {
        if (option?.prompt) {
            const len = option.prompt.length;
            api.setPrompt(option.prompt);
            api.focusInput(len, len);
        }
        else if (option?.messages) {
            api.pushMessages(option.messages);
        }
    } } = props;
    // endregion
    const [streaming, setStreaming] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState();
    const [messages, setMessages] = useState(initialMessages ??
        [
        //   { role: 'user', content: 'Generate 1 paragraph of placeholder text.' }
        //   { role: 'user', content: 'Greetings.' },
        //   { role: 'assistant', content: 'Hi! How can I assist you today?' },
        //   { role: 'user', content: 'What\'s the best time to drink coffee?' },
        //   { role: 'assistant', content: 'The best time to drink coffee is typically in the morning between 9:30 am to 11:30 am when your cortisol levels are starting to drop. However, if you have it straight after waking up, your body\'s production of cortisol (a stress hormone and also a natural mechanism which helps you stay awake) could be hindered. Coffee can also be consumed in the early afternoon, around 1:00 pm to 2:00 pm. Keep in mind that this can vary depending on your own personal body clock. It\'s also important not to consume coffee too close to bedtime, as caffeine can interfere with your ability to fall asleep.' }
        ]);
    const messagesRef = useRef(messages);
    const streamRef = useRef();
    const mountedOnceRef = useRef(false); // Pretty much for React's Strict dev mode double mounting.
    const inputRef = useRef();
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
            const reply = { role: 'assistant', content: '' };
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
        }
        catch (e) {
            setMessages(messagesRef.current);
            setError(e);
            console.error(e);
        }
        setStreaming(false);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 10);
    };
    const abortStream = () => streamRef.current?.controller.abort('Cancelled');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt)
            return;
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
        setPrompt(prompt) {
            setPrompt(prompt);
        },
        pushMessages(messages) {
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
    return (jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', width: '100%', ...sxs?.root }, children: [jsxs(Box, { sx: { overflow: 'auto', flex: '1', '*': { boxSizing: 'border-box' }, ...sxs?.messages }, children: [messages.filter((msg) => msg.role !== 'system').length === 0 && (jsxs(Box, { sx: { width: '100%', p: 2 }, children: [jsxs(Paper, { sx: { maxWidth: '400px', p: 2, mr: 'auto', ml: 'auto', textAlign: 'center', background: 'transparent' }, elevation: 0, children: [jsx(OpenAI$2, {}), jsx(Typography, { variant: "h6", children: "Generative AI Assistant" })] }), jsx(Box, { sx: {
                                    mx: 'auto',
                                    display: 'grid',
                                    maxWidth: '700px',
                                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                    columnGap: '16px',
                                    rowGap: '16px'
                                }, children: emptyStateOptions.map((option) => (jsx(Card, { children: jsx(CardActionArea, { onClick: (e) => onEmptyStateOptionClick(e, option, api), children: jsx(CardHeader, { title: option.title, subheader: option.subheader, titleTypographyProps: { variant: 'body1' }, subheaderTypographyProps: { variant: 'body2' } }) }) }, option.id))) })] })), messages.map(({ role, content }, index) => role === 'system' ? null : (jsxs(Box, { sx: { bgcolor: role === 'assistant' ? (isDark ? 'grey.900' : 'grey.100') : undefined }, children: [jsxs(StyledBox, { children: [jsx(StyledAvatar, { variant: "rounded", sx: role === 'assistant'
                                            ? { backgroundColor: aiAvatarColour, color: theme.palette.getContrastText(aiAvatarColour) }
                                            : { backgroundColor: userColour, color: theme.palette.getContrastText(userColour) }, children: role === 'assistant' ? jsx(OpenAI$2, {}) : nameToInitials(userName) }), role === 'assistant' ? (jsx(StyledIframe, { style: { height: 30 }, srcDoc: srcDoc, ref: (node) => {
                                            if (node?.contentWindow?.document?.documentElement) {
                                                node.contentWindow.document.body.innerHTML = content;
                                                node.style.height = `${node.contentWindow.document.body.scrollHeight + 5}px`;
                                            }
                                        } })) : (jsx(StyledPre, { children: content })), role === 'assistant' && (jsx(Box, { children: streaming && index === maxMessageIndex ? (jsx(Tooltip, { title: "Stop/abort", children: jsx(IconButton, { size: "small", onClick: abortStream, children: jsx(StopRounded, { fontSize: "small" }) }) })) : (jsx(Tooltip, { title: "Copy to clipboard", children: jsx(IconButton, { size: "small", onClick: () => copyToClipboard(content), children: jsx(ContentPasteRounded, { fontSize: "small" }) }) })) }))] }), !streaming && maxMessageIndex === index && role === 'assistant' && extraActions?.length && (jsx(Box, { sx: { px: 1, pb: 1, display: 'flex', justifyContent: 'right' }, children: extraActions.map(({ label, id }) => (jsx(Button, { variant: "text", size: "small", onClick: (e) => onExtraActionClick?.(e, id, content, api), children: label }, id))) }))] }, index))), error && jsx(Alert, { severity: "error", children: error.message }), scrollToReply && jsx("div", { ref: (el) => el?.scrollIntoView({ behavior: 'smooth', block: 'end' }) })] }), jsx(Box, { component: "form", onSubmit: handleSubmit, sx: {
                    p: 2,
                    pr: 1,
                    display: 'flex',
                    flexShrink: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    ...sxs?.form
                }, children: jsx(TextField, { id: "chat-gpt-input", autoFocus: true, fullWidth: true, inputRef: inputRef, disabled: streaming, label: "Send a message", value: prompt, onChange: (e) => setPrompt(e.target.value), onKeyDown: (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }, multiline: true, maxRows: 4, InputProps: {
                        endAdornment: (jsx(InputAdornment, { position: "end", children: streaming ? (jsx(Tooltip, { title: "Stop/abort", children: jsx(IconButton, { size: "small", onClick: abortStream, children: jsx(StopRounded, { fontSize: "small" }) }) })) : (jsx(Tooltip, { title: "Send message", children: jsx(IconButton, { type: "submit", disabled: streaming, onClick: handleSubmit, children: jsx(SendIcon, {}) }) })) }))
                    } }) })] }));
}

function ChatGPTPopover(props) {
    const { open, onClose, appBarProps, chatGPTProps, appBarTitle = 'AI Assistant', width = 450, height = 500, ...popoverProps } = props;
    return (jsxs(Popover, { open: open, onClose: onClose, keepMounted: false, anchorReference: "none", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, anchorPosition: { top: 100, left: 100 }, BackdropProps: { invisible: false, sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }, ...popoverProps, sx: {
            [`> .${paperClasses.root}`]: {
                width,
                height,
                display: 'flex',
                flexDirection: 'column',
                bottom: 10,
                right: 10
            },
            ...popoverProps?.sx
        }, children: [jsxs(AppBar, { position: "static", ...appBarProps, sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    placeContent: 'space-between',
                    alignItems: 'center',
                    pl: 2,
                    pr: 1,
                    py: 1,
                    ...appBarProps?.sx
                }, children: [jsx(Typography, { variant: "h6", color: "inherit", component: "div", children: appBarTitle }), jsx(IconButton, { color: "inherit", "aria-label": "close", onClick: (e) => onClose?.(e, 'closeButton'), children: jsx(CloseRounded, {}) })] }), jsx(ChatGPT, { ...chatGPTProps, sxs: { root: { height: 'calc(100% - 56px)' }, ...chatGPTProps?.sxs } })] }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveUser() {
  return useSelector((state) => state.user);
}

const helperWidgetId = 'craftercms.components.openai.Helper';
const logoWidgetId = 'craftercms.components.openai.OpenAILogo';
const chatWidgetId = 'craftercms.components.openai.ChatGPT';
const popoverWidgetId = 'craftercms.components.openai.ChatGPTPopover';
const openChatGptMessageId = 'craftercms.openai.OpenChatGPT';
const chatGptResultMessageId = 'craftercms.openai.ChatGPTResult';
const chatGptClosedMessageId = 'craftercms.openai.ChatGPTClosed';

/* Only want a single "Helper" instance listening, but people may use multiple helpers to put
 * the button in multiple places at once. This mechanism would leave the listening off if the
 * active listener unmounts. If this indeed becomes a problem, will revisit the mechanism. */
let helperListening = false;
const createChatGptPopoverProps = (user, other) => {
    const onExtraActionClick = (e, id, content, api) => getHostToGuestBus().next({ type: chatGptResultMessageId, payload: { id, content } });
    return {
        ...other,
        chatGPTProps: { ...other?.chatGPTProps, userName: createUsername(user), onExtraActionClick }
    };
};
function ChatGptHelper(props) {
    const { ui } = props;
    const user = useActiveUser();
    const [open, setOpen] = useState(false);
    const [chatGPTPopoverProps, setChatGPTPopoverProps] = useState(() => createChatGptPopoverProps(user));
    const handleOpenButtonClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        getHostToGuestBus().next({ type: chatGptClosedMessageId });
        setOpen(false);
        setChatGPTPopoverProps(createChatGptPopoverProps(user));
    };
    useEffect(() => {
        if (!helperListening) {
            helperListening = true;
            const subscription = merge(getGuestToHostBus(), getHostToHostBus()).subscribe((message) => {
                if (message.type === openChatGptMessageId) {
                    setChatGPTPopoverProps(createChatGptPopoverProps(user, message.payload));
                    setOpen(true);
                }
            });
            return () => {
                helperListening = false;
                subscription.unsubscribe();
            };
        }
    }, [user]);
    return (jsxs(Fragment, { children: [Boolean(ui) &&
                (ui === 'IconButton' ? (jsx(Tooltip, { title: "Chat GPT", children: jsx(IconButton, { onClick: handleOpenButtonClick, children: jsx(OpenAI$2, {}) }) })) : (jsx(ToolsPanelListItemButton, { icon: { id: 'craftercms.components.openai.OpenAILogo' }, title: "Chat GPT", onClick: handleOpenButtonClick }))), jsx(ChatGPTPopover, { ...chatGPTPopoverProps, open: open, onClose: handleClose })] }));
}

const plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'craftercms.openai',
    widgets: {
        [helperWidgetId]: ChatGptHelper,
        [logoWidgetId]: OpenAI$2,
        [chatWidgetId]: ChatGPT,
        [popoverWidgetId]: ChatGPTPopover
    }
};

export { ChatGPT, ChatGPTPopover, plugin as default };
