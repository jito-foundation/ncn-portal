"use client";

import { Suspense, useCallback, useContext, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SelectedWalletAccountContext } from "./context/SelectedWalletAccountContext";
import useChatHook from "./Chat/useChatHook";
import ChatContext from "./Chat/chatContext";
import { Flex } from "@radix-ui/themes";
import PersonaPanel from "@/app/chat/PersonaPanel";
import PersonaModal from "@/app/chat/PersonaModal";
import { ConnectWalletMenu } from "./ConnectWalletMenu";
import { ChatMessage } from "./Chat/interface";
import { useAuth } from "./context/AuthContext";
import ChatSmall from "./Chat/ChatSmall";
import { ChatbotButton } from "./ChatbotButton";
// import { X } from "lucide-react";

const HTML_REGULAR =
  /<(?!img|table|\/table|thead|\/thead|tbody|\/tbody|tr|\/tr|td|\/td|th|\/th|br|\/br).*?>/gi;

const ChatProvider = () => {
  const provider = useChatHook();

  return (
    <ChatContext.Provider value={provider}>
      <Flex
        style={{ height: "calc(100% - 56px)" }}
        className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gray-900 text-white rounded-lg shadow-md overflow-y-auto"
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
  const { login, isAuthenticated } = useAuth();
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you?" },
  ]);
  const [input, setInput] = useState("");
  // const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);
  const { currentChatRef, saveMessages, onToggleSidebar, forceUpdate } =
    useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);
  const conversationRef = useRef<ChatMessage[]>();
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const textAreaRef = useRef<HTMLElement>(null);
  const conversation = useRef<ChatMessage[]>([]);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer">
        Ask me anything about Jito Restaking
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 m-auto bg-gray-900 text-white w-[1000px] max-w-full h-[80vh] rounded-lg shadow-xl flex flex-col">
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
              {/* <Dialog.Close> */}
              {/* <X className="w-6 h-6 cursor-pointer" /> */}
              {/* </Dialog.Close> */}
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
                  {/* <div className="p-4 border-t border-gray-700 flex">
                            <input
                                type="text"
                                value={message}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={(e) => {
                                    setMessage(e.target.value.replace(HTML_REGULAR, ""));
                                  }}
                                placeholder="Ask me anything about Jito Restaking..."
                                className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
                                // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Send
                            </button>
                        </div> */}
                </>
              )}
            </div>
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
