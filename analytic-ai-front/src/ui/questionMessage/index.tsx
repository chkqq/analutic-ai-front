type Props = {
  question: string
  options: string[]
  onSelect: (value: string) => void
}

export const QuestionMessage = ({ question, options, onSelect }: Props) => {
  return (
    <div className="bg-[#111827] border border-[#2b2f3b] text-white p-4 rounded-2xl max-w-[80%]">
      <p className="mb-3 font-medium">{question}</p>

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="px-3 py-2 rounded-xl border border-[#2b2f3b] bg-[#0b0f1b] hover:bg-[#1a1f2e]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}