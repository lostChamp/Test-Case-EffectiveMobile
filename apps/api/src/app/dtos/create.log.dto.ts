import {IsNumber, IsString} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateLogDto {
  @ApiProperty({ description: 'User ID', nullable: false })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Operation with user(CRUD)', nullable: false })
  @IsString()
  operation: string
}
