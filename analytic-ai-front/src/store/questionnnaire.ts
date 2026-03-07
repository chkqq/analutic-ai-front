import { create } from "zustand"

type QuestionnaireState = {
  currentQuestion: number
  answers: Record<number, string>
  finished: boolean

  answerQuestion: (id: number, answer: string) => void
  reset: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  currentQuestion: 0,
  answers: {},
  finished: false,

  answerQuestion: (id, answer) =>
    set((state) => {
      const next = state.currentQuestion + 1

      return {
        answers: {
          ...state.answers,
          [id]: answer
        },
        currentQuestion: next,
        finished: next >= 7
      }
    }),

  reset: () =>
    set({
      currentQuestion: 0,
      answers: {},
      finished: false
    })
}))