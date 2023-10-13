import {IsEmail, IsString} from "@nestjs/class-validator";

export class EditUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}
