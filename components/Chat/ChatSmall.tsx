"use client";

/* eslint-disable  react-hooks/exhaustive-deps */

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Flex, IconButton, ScrollArea, Tooltip } from "@radix-ui/themes";
import ContentEditable from "react-contenteditable";
import toast from "react-hot-toast";

import ChatContext from "./chatContext";
import type { Chat, ChatMessage } from "./interface";

import "./index.scss";
import { SelectedWalletAccountContext } from "../context/SelectedWalletAccountContext";
import { ChatMessageBubble } from "../ChatMessageBubble";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const HTML_REGULAR =
  /<(?!img|table|\/table|thead|\/thead|tbody|\/tbody|tr|\/tr|td|\/td|th|\/th|br|\/br).*?>/gi;

export interface ChatProps {}

export interface ChatGPInstance {
  setConversation: (messages: ChatMessage[]) => void;
  getConversation: () => ChatMessage[];
  focus: () => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const postChatOrQuestion = async (
  chat: Chat,
  messages: any[],
  input: string,
  address: string,
) => {
  const url = "/api/chat";

  const data = {
    // prompt: chat?.persona?.prompt,
    messages: [...messages!],
    input,
    address,
  };

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const ChatSmall = (props: ChatProps, ref: any) => {
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);
  const { currentChatRef, saveMessages, forceUpdate } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);
  const conversationRef = useRef<ChatMessage[]>();
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const textAreaRef = useRef<HTMLElement>(null);
  const conversation = useRef<ChatMessage[]>([]);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (e: any) => {
      if (!isLoading) {
        e.preventDefault();
        const input =
          textAreaRef.current?.innerHTML?.replace(HTML_REGULAR, "") || "";

        if (input.length < 1) {
          toast.error("Please type a message to continue.");
          return;
        }

        const message = [...conversation.current];
        conversation.current = [
          ...conversation.current,
          { content: input, role: "user" },
        ];
        setMessage("");
        setIsLoading(true);
        try {
          /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
          const response = await postChatOrQuestion(
            currentChatRef?.current!,
            message,
            input,
            selectedWalletAccount?.address!,
          );

          if (response.ok) {
            const data = response.body;

            if (!data) {
              throw new Error("No data");
            }

            const reader = data.getReader();
            const decoder = new TextDecoder("utf-8");
            let done = false;
            let resultContent = "";

            while (!done) {
              try {
                const { value, done: readerDone } = await reader.read();
                const char = decoder.decode(value);
                if (char) {
                  setCurrentMessage((state) => {
                    resultContent = state + char;
                    return resultContent;
                  });
                }
                done = readerDone;
              } catch {
                done = true;
              }
            }
            // The delay of timeout can not be 0 as it will cause the message to not be rendered in racing condition
            setTimeout(() => {
              conversation.current = [
                ...conversation.current,
                { content: resultContent, role: "assistant" },
              ];

              setCurrentMessage("");
            }, 1);
          } else {
            const result = await response.json();
            if (response.status === 401) {
              conversation.current.pop();
              location.href =
                result.redirect +
                `?callbackUrl=${encodeURIComponent(location.pathname + location.search)}`;
            } else {
              toast.error(result.error);
            }
          }

          setIsLoading(false);
        } catch (error: any) {
          console.error(error);
          toast.error(error.message);
          setIsLoading(false);
        }
      }
    },
    [currentChatRef, isLoading],
  );

  const handleKeypress = useCallback(
    (e: any) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        sendMessage(e);
        e.preventDefault();
      }
    },
    [sendMessage],
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "50px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, currentMessage]);

  useEffect(() => {
    conversationRef.current = conversation.current;
    if (currentChatRef?.current?.id) {
      saveMessages?.(conversation.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatRef, conversation.current, saveMessages]);

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus();
    }
  }, [isLoading]);

  useImperativeHandle(ref, () => {
    return {
      setConversation(messages: ChatMessage[]) {
        conversation.current = messages;
        forceUpdate?.();
      },
      getConversation() {
        return conversationRef.current;
      },
      focus: () => {
        textAreaRef.current?.focus();
      },
    };
  });

  return (
    <Flex
      direction="column"
      className="w-full max-w-3xl h-full bg-black rounded-lg shadow-lg overflow-hidden p-4"
    >
      {/* Messages Container */}
      <ScrollArea
        className="flex-1 space-y-4 overflow-y-auto"
        style={{ maxHeight: "60vh" }}
      >
        {conversation.current.map((item, index) => (
          <ChatMessageBubble key={index} message={item} />
        ))}
        {currentMessage && (
          <ChatMessageBubble
            message={{ content: currentMessage, role: "assistant" }}
          />
        )}
        <div ref={bottomOfChatRef}></div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 mt-2 rounded-lg items-center relative">
        <div className="flex-1 items-center relative text-white px-4 py-3 focus:outline-none chat-textarea mx-2 ">
          <ContentEditable
            innerRef={textAreaRef}
            style={{ minHeight: "20px", maxHeight: "200px", overflowY: "auto" }}
            className="text-base w-full placeholder-gray-400 focus:outline-none"
            html={message}
            disabled={isLoading}
            onChange={(e) =>
              setMessage(e.target.value.replace(HTML_REGULAR, ""))
            }
            onKeyDown={(e) => {
              handleKeypress(e);
            }}
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <Tooltip content="Send Message">
            <IconButton
              radius="large"
              disabled={isLoading}
              size="3"
              className="ml-2 rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all text-white p-3 shadow-lg"
              onClick={sendMessage}
              loading={isLoading}
            >
              <PaperPlaneIcon width="18" height="18" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Flex>
  );
};

export default forwardRef<ChatGPInstance, ChatProps>(ChatSmall);
