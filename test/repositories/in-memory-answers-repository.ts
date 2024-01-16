import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.answers.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const answerIndex = this.answers.findIndex(
      (prevAnswer) => prevAnswer.id === answer.id,
    )

    this.answers.splice(answerIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async findById(answerId: string) {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId,
    )

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (prevAnswer) => prevAnswer.id === answer.id,
    )

    this.answers[answerIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
