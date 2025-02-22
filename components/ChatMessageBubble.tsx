import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomdark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { MessageProps } from "./Chat/Message";
import { Markdown } from "./Markdown";

// const AnchorTag = ({ node, children, ...props }: any) => {
//     try {
//         new URL(props.href ?? "");
//         props.target = "_blank";
//         props.rel = "noopener noreferrer";
//     } catch (e) { }
//     return <a {...props}>{children}</a>;
// }

// const CodeBlock = ({ inline, className, children, }: any) => {
//     if (inline) {
//         return <code className={className}>{children}</code>;
//     }

//     const match = /language-(\w+)/.exec(className || '');
//     if (!match) {
//         return <code className={className}>{children}</code>;
//     }

//     const lang = match && match[1] ? match[1] : '';

//     return (
//         <SyntaxHighlighter
//             style={atomDark}
//             language={lang}
//         >
//             {String(children).replace(/\n$/, '')}
//         </SyntaxHighlighter>
//     );
// }

export const ChatMessageBubble = ({ message }: MessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mt-2`}
    >
      {" "}
      {/* Added margin-top for spacing */}
      <div
        className={`p-3 rounded-xl max-w-[75%] text-white shadow-md ${isUser ? "bg-gray-700" : "bg-gray-800"}`}
      >
        {/* {isUser ? message.content : <ReactMarkdown
                    components={{
                        a: AnchorTag,
                        code: CodeBlock,
                    }}
                >{message.content}</ReactMarkdown>} Markdown support for bot messages */}
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
};
