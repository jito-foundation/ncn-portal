"use client";
import { Suspense } from "react";
import { Flex } from "@radix-ui/themes";
import { Chat, ChatContext, ChatSideBar, useChatHook } from "@/components";
import PersonaModal from "./PersonaModal";
import PersonaPanel from "./PersonaPanel";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

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
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return (
    <Suspense>
      {publicKey ? (
        <ChatProvider />
      ) : (
        <main className="flex items-center justify-center min-h-screen">
          <div className="border hover:border-slate-900 rounded">
            <WalletMultiButton style={{}} />
          </div>
        </main>
      )}
    </Suspense>
  );
};

export default ChatPage;
