import { useState, useEffect } from "react"
import { ChatHeader } from "../../features/chatHeader"
import { ChatOverview } from "../../features/chatOverview"
import { ChatInput } from "../../features/chatInput"
import { useChatStore } from "../../store/chat"

import { useQuestionnaireStore } from "../../store/questionnnaire"
import { QuestionnaireModule } from "../questionnaireModule"

export const ChatModule = () => {
  const [input, setInput] = useState("")

  const { chats, activeChatId, updateChat } = useChatStore()

  const { finished, answers } = useQuestionnaireStore()

  const chat = chats.find((c) => c.chatId === activeChatId) ?? null

  const sendMessage = () => {
    if (!input.trim() || !chat) return

    updateChat({
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
    })

    setInput("")
  }

  useEffect(() => {
    if (!finished) return

    fetch("/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers })
    })
  }, [finished])

  if (!chat) {
    return (
      <main className="flex-1 flex items-center justify-center">
        Выберите чат
      </main>
    )
  }

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">

        <div className="bg-[#0b0f1b] rounded-3xl border border-[#2b2f3b] overflow-hidden">

          <ChatHeader title={chat.title} />

          {!finished && <QuestionnaireModule />}

          {finished && <ChatOverview messages={chat.messages} />}

          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            disabled={!finished}
          />

        </div>

      </div>
    </main>
  )
}