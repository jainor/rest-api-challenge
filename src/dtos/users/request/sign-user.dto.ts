import { Expose, Exclude } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
} from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class SignUserDto extends BaseDto {
  @Expose()
  @IsEmail()
  readonly id: number

  @Expose()
  @IsEmail()
  readonly email: string

  @Expose()
  @IsString()
  @Length(6, 20)
  readonly password: string
}
