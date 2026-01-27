import { useState } from "react";
import { ChatHeader } from "../../features/chatHeader";
import { ChatOverview } from "../../features/chatOverview";
import { ChatInput } from "../../features/chatInput";
import type { ChatType } from "../../types/chat";

type Props = {
  chat: ChatType | null;
  onUpdateChat: (chat: ChatType) => void;
};

export const ChatModule = ({ chat, onUpdateChat }: Props) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim() || !chat) return;

    const updatedChat: ChatType = {
      ...chat,
      messages: [
        ...chat.messages,
        {
          id: chat.messages.length + 1,
          author: "user",
          text: input,
          time: new Date().toISOString()
        }
      ]
    };

    onUpdateChat(updatedChat);
    setInput("");
  };

  if (!chat) {
    return <main className="flex-1 flex items-center justify-center">Выберите чат</main>;
  }

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">
        <div className="bg-[#0b0f1b] rounded-3xl border border-[#2b2f3b] overflow-hidden">
          <ChatHeader title={chat.title} />
          <ChatOverview messages={chat.messages} />
          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
        </div>
      </div>
    </main>
  );
};
