import {IsEmail, IsString} from "@nestjs/class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}
