import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @MaxLength(500)
  readonly description?: string;

  @IsString()
  readonly status: 'A faire' | 'Non accomplie' | 'Accomplie';
}
