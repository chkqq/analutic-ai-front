import { useEffect, useRef } from "react"
import type { MessageType } from "../../types/chat"
import { MessageFeedback } from "../../ui/messageFeedback"

export const ChatOverview = ({ messages }: { messages: MessageType[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
  }, [messages])

  return (
    <div className="p-5 h-[640px] flex flex-col gap-4">
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2">

        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-3 p-4 rounded-2xl max-w-[80%] w-fit break-words relative ${
              m.author === "user"
                ? "ml-auto bg-gradient-to-br from-[#3a3fff] to-[#7c4dff]"
                : "bg-[#111827] border border-[#2b2f3b]"
            }`}
          >

            {m.text}

            <div className="text-[11px] text-[#b7b7c8] absolute bottom-2 right-4">
              {new Date(m.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>

            {m.author === "bot" && (
              <MessageFeedback messageId={m.id} />
            )}

          </div>
        ))}

      </div>
    </div>
  )
}