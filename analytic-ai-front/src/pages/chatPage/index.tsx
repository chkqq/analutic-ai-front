import React, { useEffect, useState } from "react";
import RequestSettings from "../../widgets/requestSettings";
import { ChatModule } from "../../widgets/chatModule";
import { ChatHistory } from "../../features/chatHistory";
import type { ChatType } from "../../types/chat";

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/dataBase/chats.json")
      .then((res) => res.json())
      .then((data) => {
        setChats(data.chats);
        setActiveChatId(data.chats[0]?.chatId ?? null);
      });
  }, []);

  const activeChat = chats.find((c) => c.chatId === activeChatId) ?? null;

  const updateChat = (updatedChat: ChatType) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === updatedChat.chatId ? updatedChat : chat
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0b0f1b] to-[#0a0c14] text-white">
      {/* Sidebar */}
      <aside className="w-[400px] bg-[#111827] rounded-r-3xl p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3a3fff] to-[#7c4dff] flex items-center justify-center">
            <span className="font-bold">AI</span>
          </div>
          <h1 className="text-xl font-bold">DataTools AI</h1>
        </div>

        {/* Profile */}
        <div className="bg-[#0b0f1b] rounded-2xl p-4 border border-[#2b2f3b]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#36c0ff] to-[#7c4dff]" />
            <div>
              <div className="font-bold">Дмитрий Колбасенко</div>
              <div className="text-[#b7b7c8] text-sm">Senior Data Analyst</div>
            </div>
          </div>

          <RequestSettings />
        </div>

        <ChatHistory
          chats={chats}
          activeChatId={activeChatId ?? ""}
          onSelectChat={setActiveChatId}
        />
      </aside>

      <ChatModule chat={activeChat} onUpdateChat={updateChat} />
    </div>
  );
};

export default ChatPage;
