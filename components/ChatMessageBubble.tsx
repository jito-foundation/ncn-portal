import { MessageProps } from "./Chat/Message";
import { Markdown } from "./Markdown";

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
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
};
