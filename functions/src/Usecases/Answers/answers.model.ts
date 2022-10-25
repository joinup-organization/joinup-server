export interface IAnswer {
  readonly id: string
  readonly message: string
  readonly project: {
    readonly id: string
    readonly name: string
  }
  readonly vacancy: {
    readonly id: string
    readonly name: string
  }
  readonly enterprise: {
    readonly id: string
    readonly name: string
    readonly photo: string
  }
  readonly sentAt: string
  readonly userId: string
}

export interface IAnswerService {
  readonly getAnswers: (userId: string) => Promise<IAnswer[]>
  readonly submitAnswers: (answer: Omit<IAnswer, 'sentAt'>) => Promise<void>
  readonly getAnswer: (id: string) => Promise<IAnswer>
}
