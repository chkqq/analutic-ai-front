import { useEffect, useState } from "react";
import { ChatHeader } from "../../features/chatHeader";
import { Chat } from "../../features/chatOverview";
import { ChatInput } from "../../features/chatInput";

type Message = {
  id: number;
  author: "user" | "bot";
  text: string;
  time: string;
};

export const ChatModule = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/data/chats.json")
      .then((res) => res.json())
      .then((data) => setMessages(data.chats[0].messages));
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, author: "user", text: input, time: new Date().toISOString() }
    ]);

    setInput("");
  };

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">
        <div className="bg-[#0b0f1b] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-[#2b2f3b] overflow-hidden">
          <ChatHeader />
          <Chat messages={messages} />
          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
        </div>
      </div>
    </main>
  );
};
