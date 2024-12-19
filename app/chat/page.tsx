"use client";

import { Suspense, useContext } from "react";
import { Flex } from "@radix-ui/themes";
import { Chat, ChatContext, ChatSideBar, useChatHook } from "@/components";
import PersonaModal from "./PersonaModal";
import PersonaPanel from "./PersonaPanel";
import { ConnectWalletMenu } from "@/components/ConnectWalletMenu";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const ChatProvider = () => {
  const provider = useChatHook();

  return (
    <ChatContext.Provider value={provider}>
      <Flex style={{ height: "calc(100% - 56px)" }} className="relative">
        <ChatSideBar />
        <div className="flex-1 relative">
          <Chat ref={provider.chatRef} />
          <PersonaPanel />
        </div>
      </Flex>
      <PersonaModal />
    </ChatContext.Provider>
  );
};

const ChatPage = () => {
  useRequireAuth();

  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  return (
    <Suspense>
      {selectedWalletAccount ? (
        <ChatProvider />
      ) : (
        <main className="flex items-center justify-center min-h-screen">
          <div className="border hover:border-slate-900 rounded">
            <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
          </div>
        </main>
      )}
    </Suspense>
  );
};

export default ChatPage;
