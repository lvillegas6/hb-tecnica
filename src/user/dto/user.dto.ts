import {
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUsertDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: `Email del Userto` })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: `Contraseña del Userto` })
  readonly pass: string;

  
}

export class UpdateUsertDto extends PartialType(CreateUsertDto) {}
