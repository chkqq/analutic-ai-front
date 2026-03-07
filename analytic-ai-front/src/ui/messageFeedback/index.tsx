import { useState } from "react"

type Props = {
  messageId: number
}

export const MessageFeedback = ({ messageId }: Props) => {
  const [value, setValue] = useState<"like" | "dislike" | null>(null)

  const sendFeedback = async (type: "like" | "dislike") => {
    setValue(type)

    await fetch("/api/message-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messageId,
        feedback: type
      })
    })
  }

  return (
    <div className="flex gap-2 mt-2 text-sm">

      <button
        onClick={() => sendFeedback("like")}
        className={`px-2 py-1 rounded ${
          value === "like"
            ? "bg-green-600 text-white"
            : "bg-[#1a1f2e]"
        }`}
      >
        👍
      </button>

      <button
        onClick={() => sendFeedback("dislike")}
        className={`px-2 py-1 rounded ${
          value === "dislike"
            ? "bg-red-600 text-white"
            : "bg-[#1a1f2e]"
        }`}
      >
        👎
      </button>

    </div>
  )
}