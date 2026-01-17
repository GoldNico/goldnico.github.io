<template>
  <div class="markdown-container" v-html="parsedMarkdown"></div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Markdown',
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  computed: {
    parsedMarkdown() {
      return marked(this.source)
    }
  }
}
</script>

<style scoped>
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
  color: #fff;
  text-align: left;
}

.markdown-container h1,
.markdown-container h2,
.markdown-container h3,
.markdown-container h4,
.markdown-container h5,
.markdown-container h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #fff;
}

.markdown-container h1 {
  font-size: 2em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.3em;
}

.markdown-container h2 {
  font-size: 1.5em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.3em;
}

.markdown-container h3 {
  font-size: 1.25em;
}

.markdown-container h4 {
  font-size: 1em;
}

.markdown-container h5 {
  font-size: 0.875em;
}

.markdown-container h6 {
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.7);
}

.markdown-container p {
  margin-top: 0;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-container ul,
.markdown-container ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-container li {
  margin-top: 0.25em;
}

.markdown-container code {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 85%;
  padding: 0.2em 0.4em;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  color: #ffd700;
}

.markdown-container pre {
  margin-top: 0;
  margin-bottom: 16px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.markdown-container pre code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
  color: #ffd700;
}

.markdown-container a {
  color: #64ffda;
  text-decoration: none;
}

.markdown-container a:hover {
  text-decoration: underline;
}

.markdown-container blockquote {
  margin: 0;
  padding: 0 1em;
  color: rgba(255, 255, 255, 0.7);
  border-left: 0.25em solid rgba(255, 255, 255, 0.3);
}

.markdown-container img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.markdown-container table {
  display: block;
  width: 100%;
  overflow: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
}

.markdown-container table th {
  font-weight: 600;
  padding: 6px 13px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}

.markdown-container table td {
  padding: 6px 13px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.markdown-container table tr {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.markdown-container table tr:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
