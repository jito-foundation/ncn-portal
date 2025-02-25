/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      // className="prose prose-invert prose-lg max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        // Code blocks with syntax highlighting
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className="rounded-lg overflow-hidden my-6">
              <SyntaxHighlighter
                {...props}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-lg border border-gray-700 !bg-gray-900"
                showLineNumbers
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="px-1.5 py-0.5 rounded-md bg-gray-800 font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        // Enhance heading styles
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold text-white mt-10 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="text-2xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-bold text-white mt-6 mb-2" {...props} />
        ),

        // Style links
        a: ({ node, ...props }) => (
          <a
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            {...props}
          />
        ),

        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-6 space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-6 space-y-2" {...props} />
        ),
        li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,

        // Paragraphs and quotes
        p: ({ node, ...props }) => (
          <p className="text-gray-300 my-4 leading-relaxed" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-400"
            {...props}
          />
        ),

        // Make tables look better
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-8">
            <table className="min-w-full divide-y divide-gray-700" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-800" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th
            className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="px-4 py-3 text-sm text-gray-300 border-t border-gray-800"
            {...props}
          />
        ),

        // Other elements
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-gray-700" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img
            className="mx-auto rounded-lg max-w-full my-8"
            {...props}
            alt={props.alt || "Image"}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
