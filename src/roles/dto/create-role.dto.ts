import { ApiProperty } from "@nestjs/swagger";
export class CreateRoleDto {
    @ApiProperty({ example: "ADMIN", description: "Role's name" })
    readonly value: string;

    @ApiProperty({ example: "description", description: "Role's description" })
    readonly description: string;
}
