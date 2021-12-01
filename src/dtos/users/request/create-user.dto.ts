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
export class CreateUserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string

  @Expose()
  @IsEmail()
  readonly email: string

  @Expose()
  @IsString()
  @Length(6, 200)
  readonly password: string
}
