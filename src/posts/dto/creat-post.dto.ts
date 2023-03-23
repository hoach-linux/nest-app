import { ApiProperty } from "@nestjs/swagger";
export class CreatePostDto {
    @ApiProperty({ example: "Elon musk", description: "Post's title" })
    readonly title: string;

    @ApiProperty({ example: "content", description: "content" })
    readonly content: string;

    @ApiProperty({ example: "1", description: "User id" })
    readonly id: number;
}
