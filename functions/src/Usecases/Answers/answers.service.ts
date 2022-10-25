import { firestoreAdapter } from '../../Adapters/Firestore/firestore.adapter'
import { IFirestoreAdapter } from '../../Adapters/Firestore/firestore.model'
import { ECollections } from '../../Database/database.model'

import { IAnswer, IAnswerService } from './answers.model'

export class AnswersService implements IAnswerService {
  constructor(private readonly firestore: IFirestoreAdapter = firestoreAdapter) {}

  public getAnswers = async (userId: string) => {
    console.log(userId)
    const answers = await this.firestore.getItemsByParams<IAnswer>(ECollections.answer, [
      { key: 'userId', type: '==', value: userId },
    ])

    return answers
  }

  public getAnswer = async (id: string) => {
    const answer = await this.firestore.getItem<IAnswer>(ECollections.answer, id)
    return answer
  }

  public submitAnswers = async (answer: Omit<IAnswer, 'sentAt'>) => {
    await this.firestore.createItem(ECollections.answer, { ...answer, sentAt: new Date().toISOString() })
  }
}
