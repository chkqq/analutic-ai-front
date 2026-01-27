import type { ChatType } from "../../types/chat";

type Props = {
  chats: ChatType[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
};

export const ChatHistory = ({ chats, activeChatId, onSelectChat }: Props) => {
  return (
    <div className="mt-auto">
      <div className="font-bold mb-2">История запросов</div>

      <div className="bg-[#0b0f1b] rounded-xl p-3 border border-[#2b2f3b]">
        {chats.map((chat) => {
          const lastMessage = chat.messages.at(-1);

          return (
            <div
              key={chat.chatId}
              onClick={() => onSelectChat(chat.chatId)}
              className={`cursor-pointer flex justify-between text-sm mt-2 p-2 rounded-xl ${
                activeChatId === chat.chatId
                  ? "bg-[#1f2330]"
                  : "hover:bg-[#161a24]"
              }`}
            >
              <span>
                {lastMessage
                  ? new Date(lastMessage.time).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit"
                    })
                  : "—"}
              </span>

              <span>{chat.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
