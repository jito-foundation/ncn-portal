"use client"

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
// import { X } from "lucide-react";

export default function ChatbotModal() {
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
            <Dialog.Close>
              {/* <X className="w-6 h-6 cursor-pointer" /> */}
            </Dialog.Close>
          </div>
          
          {/* Chat History */}
          <div className="flex flex-1 overflow-hidden">
            <aside className="w-1/4 bg-gray-800 p-4 border-r border-gray-700 hidden md:block">
              <h3 className="text-lg font-semibold mb-2">History</h3>
              <button className="text-left bg-gray-700 p-2 rounded w-full mb-2">Previous Chat</button>
              <button className="text-left bg-gray-700 p-2 rounded w-full">New Chat</button>
            </aside>
            
            {/* Chat Box */}
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`p-3 rounded-lg max-w-[75%] ${msg.sender === "bot" ? "bg-gray-700 text-left" : "bg-blue-500 text-white self-end text-right"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Suggested Questions */}
          <div className="p-4 border-t border-gray-700 flex gap-2 overflow-x-auto">
            <button className="bg-gray-800 text-white px-3 py-2 rounded">What’s Jito Restaking?</button>
            <button className="bg-gray-800 text-white px-3 py-2 rounded">How do I get started?</button>
            <button className="bg-gray-800 text-white px-3 py-2 rounded">Why is it better than others?</button>
          </div>
          
          {/* Input Field */}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
