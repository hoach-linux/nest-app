import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({ example: "ADMIN", description: "Role value" })
    @IsString({ message: "Must be a string" })
    readonly value: string;

    @IsNumber({}, { message: "Must be a number" })
    @ApiProperty({ example: "1", description: "User id" })
    readonly userId: number;
}
