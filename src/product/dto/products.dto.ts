import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Nombre del producto` })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `Descripción del producto` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Precio del producto` })
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `Cantidad de productos` })
  readonly quantity: number;
  
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
