import { Expose, Exclude } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsBoolean,
} from 'class-validator'
import { BaseDto } from '../../../base.dto'

@Exclude()
export class CreatePostReactionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  readonly reaction: boolean
}
