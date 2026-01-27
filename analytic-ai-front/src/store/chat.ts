import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatType } from "../types/chat";

const sortByLastMessage = (chats: ChatType[]) =>
  [...chats].sort((a, b) => {
    const aTime = a.messages.at(-1)?.time ?? "";
    const bTime = b.messages.at(-1)?.time ?? "";
    return bTime.localeCompare(aTime);
  });

type ChatStore = {
  chats: ChatType[];
  activeChatId: string | null;

  setChats: (chats: ChatType[]) => void;
  setActiveChat: (chatId: string) => void;
  updateChat: (chat: ChatType) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,

      setChats: (chats) =>
        set({
          chats: sortByLastMessage(chats),
          activeChatId: chats[0]?.chatId ?? null
        }),

      setActiveChat: (chatId) =>
        set({ activeChatId: chatId }),

      updateChat: (updatedChat) =>
        set((state) => {
          const updated = state.chats.map((chat) =>
            chat.chatId === updatedChat.chatId ? updatedChat : chat
          );

          return {
            chats: sortByLastMessage(updated)
          };
        })
    }),
    {
      name: "chat-storage"
    }
  )
);
