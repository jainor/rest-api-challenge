import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { CommentDto } from '../dtos/comments/response/comment.dto'
import { CommentsService } from '../services/comments.service'

export async function find(req: Request, res: Response): Promise<void> {
  const comments = await CommentsService.find()

  res.status(200).json(plainToClass(CommentDto, comments))
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateCommentDto, req.body)
  await dto.isValid()

  const comment = await CommentsService.create(dto)

  res.status(201).json(plainToClass(CommentDto, comment))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const comment = await CommentsService.findOne(parseInt(req.params.id))

  res.status(200).json(plainToClass(CommentDto, comment))
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateCommentDto, req.body)
  await dto.isValid()

  const comment = await CommentsService.update(parseInt(req.params.id), dto)

  res.status(200).json(plainToClass(CommentDto, comment))
}
