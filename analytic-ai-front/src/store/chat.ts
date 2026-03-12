import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatType, QuestionnaireData } from "../types/chat";
import { QUESTIONS } from "../entities/questions";

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
  createChat: () => void;
  answerQuestion: (field: string, value: number | number[]) => void;
  clearChats: () => void;
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
        }),

      createChat: () =>
        set((state) => {
          const newChatId = `chat_${Date.now()}`;

          const newChat: ChatType = {
            chatId: newChatId,
            title: "Новый чат",
            messages: [
              {
                id: 1,
                author: "bot",
                text: "✅ Вы ответили на все вопросы. Теперь мы можем начать анализ и подобрать подходящие инструменты. Опишите вашу задачу или отправьте данные для анализа.",
                time: new Date().toISOString()
              }
            ],
            questionnaire: {
              currentQuestion: 0,
              answers: {},
              finished: false
            }
          };

          return {
            chats: sortByLastMessage([newChat, ...state.chats]),
            activeChatId: newChatId
          };
        }),

      clearChats: () =>
        set({ chats: [], activeChatId: null }),

      answerQuestion: (field, value) =>
        set((state) => {
          const activeChat = state.chats.find(c => c.chatId === state.activeChatId);
          if (!activeChat) return state;

          const current = activeChat.questionnaire ?? { currentQuestion: 0, answers: {}, finished: false };
          const next = current.currentQuestion + 1;
          const newQuestionnaire: QuestionnaireData = {
            currentQuestion: next,
            answers: { ...current.answers, [field]: value },
            finished: next >= QUESTIONS.length
          };

          return {
            chats: state.chats.map(c =>
              c.chatId === state.activeChatId
                ? { ...c, questionnaire: newQuestionnaire }
                : c
            )
          };
        })
    }),
    {
      name: "chat-storage"
    }
  )
);