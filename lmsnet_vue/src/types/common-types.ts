export interface QuizType {
  question: string
  answer: string
  op1: string
  op2: string
  op3: string
}

export interface Comment {
  name: string
  content: string
  created_at?: string
  id?: number
}
