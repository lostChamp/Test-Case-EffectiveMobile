import {IsEmail, IsString} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  email: string;
}
