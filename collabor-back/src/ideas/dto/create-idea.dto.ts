import { IsBoolean, IsOptional, MaxLength, Length } from 'class-validator';

export class CreateIdeaDto {
  @Length(5, 40, {
    message: 'The name of the idea must be between 5 and 40 characters',
  })
  name: string;

  @IsOptional()
  @MaxLength(100, {
    message: 'The description cannot exceed 100 characters',
  })
  description: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
