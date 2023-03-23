import { User } from "./../users/users.model";
import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({ example: "1", description: "Unique indificator" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "Elon musk", description: "Post's title" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @ApiProperty({
        example: "Elon musk is the richest man in the world",
        description: "Content",
    })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @ApiProperty({
        example: "boolean(true || false)",
        description: "banned or not",
    })
    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
