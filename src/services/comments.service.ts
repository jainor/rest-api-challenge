import { Prisma, Comment } from '@prisma/client'
import createError from 'http-errors'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { prisma } from '../app'

export class CommentsService {
  static async find(): Promise<Comment[]> {
    return prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: CreateCommentDto): Promise<Comment> {
    if (await prisma.comment.count({ where: { id: input.id } })) {
      throw new createError.UnprocessableEntity('id already taken')
    }

    return prisma.comment.create({ data: input })
  }

  static async findOne(id: number): Promise<Comment> {
    return prisma.comment.findUnique({ where: { id } })
  }

  static async update(id: number, input: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await prisma.comment.update({
        data: input,
        where: {
          id,
        },
      })

      return comment
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new createError.UnprocessableEntity('id already taken')
        }
      }
      throw error
    }
  }
}
