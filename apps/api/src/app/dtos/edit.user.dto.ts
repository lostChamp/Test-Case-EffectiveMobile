import {IsEmail, IsString} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class EditUserDto {
  @ApiProperty({ description: 'User name(NEW)', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'User email(NEW)', nullable: false })
  @IsEmail()
  email: string;
}
