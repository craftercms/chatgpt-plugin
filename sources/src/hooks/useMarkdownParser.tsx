import { useMemo } from 'react';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const userMarkdownParser = () => {
  return useMemo(() => {
    const marked = new Marked(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    marked.setOptions({
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      silent: false,
      tokenizer: null,
      walkTokens: null
    });

    return marked;
  }, []);
};

export default userMarkdownParser;
