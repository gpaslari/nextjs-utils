"use client"

import hljs from "highlight.js/lib/core";

import typescript from "highlight.js/lib/languages/typescript";

import {ReactNode, useEffect, useRef} from "react";

hljs.registerLanguage("typescript", typescript);

interface Props {
    children: ReactNode;
}

const CodeSnippet = ({children}: Props) => {
    const codeRef = useRef(null);

    useEffect(() => {
        hljs.highlightBlock(codeRef.current);
    }, [codeRef]);

    return <pre>
      <code className="typescript" ref={codeRef}>
          {children}
      </code>
    </pre>;
};

export default CodeSnippet;