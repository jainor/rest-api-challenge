import { Expose, Exclude } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsBoolean,
} from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class CreateCommentDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string
}
