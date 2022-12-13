import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @Length(2, 50)
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
