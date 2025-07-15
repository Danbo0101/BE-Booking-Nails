import { IsString, IsOptional, IsNotEmpty, IsInt, IsArray, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    price: number;

    @IsNotEmpty()
    @IsString()
    duration: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    status: number = 1;

}