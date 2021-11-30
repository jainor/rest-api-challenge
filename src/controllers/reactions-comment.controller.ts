import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateCommentReactionDto } from '../dtos/reactions/comments/request/create-comment-reaction.dto'
import { UpdateCommentReactionDto } from '../dtos/reactions/comments/request/update-comment-reaction.dto'
import { CommentReactionDto } from '../dtos/reactions/comments/response/comment-reaction.dto'
import { CommentReactionsService } from '../services/reactions-comment.service'

export async function find(req: Request, res: Response): Promise<void> {
  const posts = await CommentReactionsService.find()

  res.status(200).json(plainToClass(CommentReactionDto, posts))
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateCommentReactionDto, req.body)
  await dto.isValid()

  const post = await CommentReactionsService.create(dto)

  res.status(201).json(plainToClass(CommentReactionDto, post))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const post = await CommentReactionsService.findOne(parseInt(req.params.id))

  res.status(200).json(plainToClass(CommentReactionDto, post))
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateCommentReactionDto, req.body)
  await dto.isValid()

  const post = await CommentReactionsService.update(
    parseInt(req.params.id),
    dto,
  )

  res.status(200).json(plainToClass(CommentReactionDto, post))
}
