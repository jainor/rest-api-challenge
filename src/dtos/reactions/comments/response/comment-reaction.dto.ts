import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class CommentReactionDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly userId: number

  @Expose()
  readonly postId: number

  @Expose()
  readonly reaction: boolean

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}
