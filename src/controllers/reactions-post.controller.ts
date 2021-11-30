import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreatePostReactionDto } from '../dtos/reactions/posts/request/create-post-reaction.dto'
import { UpdatePostReactionDto } from '../dtos/reactions/posts/request/update-post-reaction.dto'
import { PostReactionDto } from '../dtos/reactions/posts/response/post-reaction.dto'
import { PostReactionsService } from '../services/reactions-post.service'

export async function find(req: Request, res: Response): Promise<void> {
  const posts = await PostReactionsService.find()

  res.status(200).json(plainToClass(PostReactionDto, posts))
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreatePostReactionDto, req.body)
  await dto.isValid()

  const post = await PostReactionsService.create(dto)

  res.status(201).json(plainToClass(PostReactionDto, post))
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const post = await PostReactionsService.findOne(parseInt(req.params.id))

  res.status(200).json(plainToClass(PostReactionDto, post))
}

export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdatePostReactionDto, req.body)
  await dto.isValid()

  const post = await PostReactionsService.update(parseInt(req.params.id), dto)

  res.status(200).json(plainToClass(PostReactionDto, post))
}
