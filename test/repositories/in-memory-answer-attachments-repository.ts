import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachments: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (answerComment) => answerComment.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.answerAttachments.filter(
      (answerComment) => answerComment.answerId.toString() !== answerId,
    )

    this.answerAttachments = answerAttachments
  }
}
