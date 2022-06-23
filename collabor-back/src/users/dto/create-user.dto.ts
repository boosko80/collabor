import { IsEmail, IsOptional, IsUrl, Length, Matches } from 'class-validator';
import { ConfirmPassword } from '../decorator/confirmPassword.decorator';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @Length(4, 20)
  username: string;

  @IsOptional()
  @IsUrl()
  githubPage: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
    {
      message:
        'password must have a minimum of eight characters, at least one letter, one number and one special character.',
    },
  )
  password: string;

  @ConfirmPassword('password', { message: 'passwords do not match.' })
  confirmPassword: string;
}
