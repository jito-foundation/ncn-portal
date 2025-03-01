"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

import ImageModal from "./ImageModal";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalImage(null);
    // Restore body scrolling
    document.body.style.overflow = "";
  };

  return (
    <>
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
          h1: ({ node, ...props }) => (
            <h1
              className="text-4xl font-bold text-white mt-10 mb-6"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-3xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-2xl font-bold text-white mt-6 mb-3"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-bold text-white mt-6 mb-2" {...props} />
          ),

          // Larger paragraph text
          p: ({ node, ...props }) => (
            <p
              className="text-xl text-gray-300 my-4 leading-relaxed"
              {...props}
            />
          ),

          // Larger lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-6 space-y-3 text-xl" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal pl-6 my-6 space-y-3 text-xl"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-300" {...props} />
          ),

          // Blockquotes with larger text
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="pl-4 border-l-4 border-blue-500 italic my-6 text-xl text-gray-400"
              {...props}
            />
          ),

          // Tables with larger text
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table
                className="min-w-full divide-y divide-gray-700 text-lg"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-800" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-3 text-left text-base font-medium text-gray-400 uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-3 text-base text-gray-300 border-t border-gray-800"
              {...props}
            />
          ),

          // Other elements
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-gray-700" {...props} />
          ),
          // Clickable images that open in modal
          img: ({ node, src, alt, ...props }) => (
            <div className="my-8 flex justify-center">
              <img
                src={src}
                alt={alt || "Image"}
                className="rounded-lg max-w-full max-h-96 object-contain cursor-pointer transition-all hover:opacity-90"
                style={{ maxWidth: "80%" }}
                onClick={() => openModal(src || "", alt || "Image")}
                {...props}
              />
            </div>
          ),

          // Links with better hover effects
          a: ({ node, ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Modal for expanded images */}
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default MarkdownRenderer;
