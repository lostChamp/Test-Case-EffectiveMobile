import {IsNumber, IsString} from "@nestjs/class-validator";

export class CreateLogDto {
  @IsNumber()
  user_id: number;

  @IsString()
  operation: string
}
