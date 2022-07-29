import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import 'prismjs/components/prism-clike';
import { useEffect, useState } from "react";


const highlightWithLineNumbers = (input, language) =>
  Prism.highlight(input, Prism.languages[language], language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const CustomEditor = ({ languageSelected}) => {


  const [ snippet, setSnippet ] = useState("")
  useEffect(() => {
    Prism.highlightAll();
  }, [languageSelected, snippet]);


  return (
    <Editor name="editor"
            highlight={code => highlightWithLineNumbers(code, languageSelected)}
            padding={10}
            textareaId="codeArea"
            className="w-full h-80 editor border-2 rounded-md"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              outline: 0
            }}
     onValueChange={(code) => setSnippet(code)} value={snippet}/>
    /*<div >
      <textarea

        value={snippet}
        onChange={(evt) => setSnippet(evt.target.value)}
      />
      <pre>
        <code className={`language-${languageSelected}`}>{snippet}</code>
      </pre>
    </div>*/
  )
}

export default CustomEditor;