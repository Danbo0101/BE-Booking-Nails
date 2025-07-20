import { IsString, IsOptional, IsNotEmpty, IsInt, IsArray, IsDefined, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateScheduleDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    weekday: number;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;

}
