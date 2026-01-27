import { useEffect } from "react";
import { ChatModule } from "../../widgets/chatModule";
import { useChatStore } from "../../store/chat";
import { SideBarModule } from "../../widgets/sideBarModule";
const ChatPage = () => {

const { chats, setChats } = useChatStore();
  useEffect(() => {
     if (chats.length > 0) return
    fetch("/dataBase/chats.json")
      .then((res) => res.json())
      .then((data) => setChats(data.chats));
  }, [setChats]);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0b0f1b] to-[#0a0c14] text-white">
      <SideBarModule />
      <ChatModule />
    </div>
  );
};

export default ChatPage;
