import { IsString, IsOptional, IsNotEmpty, IsInt, IsArray, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @Type(() => Number) // ép kiểu nếu dữ liệu là string
    @IsInt()
    roleId: number = 3;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    status: number = 1;

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    serviceIds?: number[];
}
