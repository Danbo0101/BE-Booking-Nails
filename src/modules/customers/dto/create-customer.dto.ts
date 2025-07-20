import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    email: string;

}