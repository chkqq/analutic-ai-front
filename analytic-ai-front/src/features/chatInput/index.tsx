import { Button } from "../../ui/button";

export const ChatInput = ({
  input,
  setInput,
  sendMessage
}: {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
}) => {
  return (
    <div className="flex gap-3 items-center p-3 border-t border-[#2b2f3b]">
      <input
        className="flex-1 bg-[#0b0f1b] border border-[#2b2f3b] rounded-2xl p-4 outline-none text-white placeholder:text-[#7b7b8c]"
        placeholder="Напишите сообщение..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <Button onClick={sendMessage}>
          Отправить
      </Button>
    </div>
  );
};
