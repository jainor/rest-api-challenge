import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class PostDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly userId: number

  @Expose()
  readonly content: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}
