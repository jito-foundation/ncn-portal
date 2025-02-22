"use client";

import { Box, Flex, IconButton, ScrollArea, Text } from "@radix-ui/themes";
import cs from "classnames";
import React, { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

import ChatContext from "./chatContext";
import "./index.scss";

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
  } = useContext(ChatContext);

  return (
    <Flex
      direction="column"
      className={cs("chat-side-bar", { show: toggleSidebar })}
    >
      <Flex
        className="p-2 h-full overflow-hidden w-64"
        direction="column"
        gap="3"
      >
        <Box
          width="auto"
          onClick={() => onCreateChat?.(DefaultPersonas[0])}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <FiPlus className="size-4" />
          <Text>New Chat</Text>
        </Box>
        <ScrollArea className="flex-1 " style={{ width: "100%" }} type="auto">
          <Flex direction="column" gap="3">
            {chatList.map((chat) => (
              <Box
                key={chat.id}
                width="auto"
                className={cs(
                  "bg-token-surface active:scale-95 truncate cursor-pointer",
                  {
                    active: currentChatRef?.current?.id === chat.id,
                  },
                )}
                onClick={() => onChangeChat?.(chat)}
              >
                <Flex
                  gap="2"
                  align="center"
                  className="overflow-hidden whitespace-nowrap"
                >
                  <BiMessageDetail className="size-4" />
                  <Text as="p" className="truncate">
                    {/* {chat.messages !== undefined || chat.messages !== null
                      ? chat.messages[0].content
                      : null} */}
                    Chat
                  </Text>
                </Flex>
                <IconButton
                  size="2"
                  className="cursor-pointer"
                  variant="ghost"
                  color="gray"
                  radius="full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat?.(chat);
                  }}
                >
                  <AiOutlineCloseCircle className="size-4" />
                </IconButton>
              </Box>
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default ChatSideBar;
