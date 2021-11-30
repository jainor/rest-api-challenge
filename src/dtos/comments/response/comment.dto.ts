import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class CommentDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly postId: number

  @Expose()
  readonly userId: number

  @Expose()
  readonly content: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  readonly numLikes: number

  @Expose()
  readonly numDislikes: number
}
