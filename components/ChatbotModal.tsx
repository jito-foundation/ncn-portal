"use client";

import PersonaModal from "@/app/chat/PersonaModal";
import PersonaPanel from "@/app/chat/PersonaPanel";
import * as Dialog from "@radix-ui/react-dialog";
import { Flex } from "@radix-ui/themes";
import { Suspense, useContext } from "react";

import ChatSmall from "./Chat/ChatSmall";
import ChatContext from "./Chat/chatContext";
import useChatHook from "./Chat/useChatHook";
import { ChatbotButton } from "./ChatbotButton";
import { ConnectWalletMenu } from "./ConnectWalletMenu";
import { useAuth } from "./context/AuthContext";
import { SelectedWalletAccountContext } from "./context/SelectedWalletAccountContext";

const ChatProvider = () => {
  const provider = useChatHook();

  return (
    <ChatContext.Provider value={provider}>
      <Flex
        // style={{ height: "calc(100% - 56px)" }}
        className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg shadow-md overflow-y-auto"
      >
        {/* <ChatSideBar /> */}
        <div className="flex-1 w-full max-w-3xl relative flex flex-col justify-center items-center gap-4">
          <ChatSmall ref={provider.chatRef} />
          <PersonaPanel />
        </div>
      </Flex>
      <PersonaModal />
    </ChatContext.Provider>
  );
};

export default function ChatbotModal() {
  const { isAuthenticated } = useAuth();
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer">
        Ask me anything about Jito Restaking
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 m-auto bg-black text-white w-[1000px] max-w-full h-[80vh] rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <Suspense>
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">
                Ask me anything about Jito Restaking
              </h2>
              <Flex>
                <div className="bg-blue-800 p-4 rounded-lg shadow-lg cursor-pointer">
                  <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
                </div>
              </Flex>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-center items-center">
              {selectedWalletAccount && (
                <>
                  {isAuthenticated ? (
                    <ChatProvider />
                  ) : (
                    <div
                      className="bg-blue-800 p-4 rounded-lg shadow-md w-full max-w-lg text-center cursor-pointer hover:bg-blue-700 transition\"
                      onClick={() =>
                        console.log("WhitelistFeaturePanel clicked")
                      }
                    >
                      <ChatbotButton account={selectedWalletAccount} />
                    </div>
                  )}
                </>
              )}
            </div>
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
