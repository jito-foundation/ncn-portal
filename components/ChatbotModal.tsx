"use client"

import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SelectedWalletAccountContext } from "./context/SelectedWalletAccountContext";
import useChatHook from "./Chat/useChatHook";
import ChatContext from "./Chat/chatContext";
import { Flex } from "@radix-ui/themes";
import PersonaPanel from "@/app/chat/PersonaPanel";
import Chat from "./Chat/Chat";
import PersonaModal from "@/app/chat/PersonaModal";
import { ConnectWalletMenu } from "./ConnectWalletMenu";
// import { X } from "lucide-react";

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

export default function ChatbotModal() {
    const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: "user", text: input }]);
        setInput("");

        // Simulating bot response (Replace with actual API call)
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "bot", text: "I'm just a dummy bot!" }]);
        }, 1000);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600">
                Ask me anything about Jito Restaking
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed inset-0 m-auto bg-gray-900 text-white w-[1000px] max-w-full h-[80vh] rounded-lg shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold">Ask me anything about Jito Restaking</h2>
                        <div className="">
                            <div className="">
                                <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
                            </div>
                        </div>
                        {/* <Dialog.Close> */}
                            {/* <X className="w-6 h-6 cursor-pointer" /> */}
                        {/* </Dialog.Close> */}
                    </div>

                    {selectedWalletAccount ? <>
                        <ChatProvider />
                        <div className="p-4 border-t border-gray-700 flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about Jito Restaking..."
                                className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Send
                            </button>
                        </div>
                    </> :
                        null
                    }
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
