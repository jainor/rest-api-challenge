import { Prisma, Post } from '@prisma/client'
import createError from 'http-errors'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto'
import { prisma } from '../server'

export class PostsService {
  static async find(): Promise<Post[]> {
    return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: CreatePostDto): Promise<Post> {
    if (await prisma.post.count({ where: { id: input.id } })) {
      throw new createError.UnprocessableEntity('id already taken')
    }

    return prisma.post.create({ data: input })
  }

  static async findOne(id: number): Promise<Post> {
    return prisma.post.findUnique({ where: { id } })
  }

  static async update(id: number, input: UpdatePostDto): Promise<Post> {
    try {
      const post = await prisma.post.update({
        data: input,
        where: {
          id,
        },
      })

      return post
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
