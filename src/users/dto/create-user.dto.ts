import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "example@mail.xyz", description: "Email address" })
    @IsString({ message: "Must be a string" })
    @IsEmail({}, { message: "Email is not valid" })
    readonly email: string;

    @ApiProperty({ example: "12345678", description: "Password" })
    @IsString({ message: "Must be a string" })
    @Length(8, 16, {
        message: "Password must be greater than 8 and less than 16",
    })
    readonly password: string;
}
