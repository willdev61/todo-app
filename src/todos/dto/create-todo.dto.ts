import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @MaxLength(500)
  readonly description?: string;

  @IsBoolean()
  readonly status: boolean;
}
