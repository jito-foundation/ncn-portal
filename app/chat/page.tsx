"use client";

import { Suspense, useContext, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { Chat, ChatContext, useChatHook } from "@/components";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

import PersonaModal from "./PersonaModal";
import PersonaPanel from "./PersonaPanel";

const ChatProvider = () => {
  const provider = useChatHook();

  return (
    <ChatContext.Provider value={provider}>
      <Flex style={{ height: "calc(100% - 56px)" }} className="relative">
        {/* <ChatSideBar /> */}
        <div className="flex-1 relative justify-center flex">
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
  const router = useRouter();
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  useEffect(() => {
    if (!selectedWalletAccount) {
      // Redirect to the login page if the wallet is not connected
      router.push("/login");
    }
  }, [selectedWalletAccount, router]);

  return (
    <Suspense>
      <Header />
      {selectedWalletAccount ? <ChatProvider /> : null}
    </Suspense>
  );
};

export default ChatPage;
