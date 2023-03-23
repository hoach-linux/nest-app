import { Post } from "./../posts/post.model";
import { UserRoles } from "./../roles/user-roles.model";
import { Role } from "./../roles/roles.model";
import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: "1", description: "Unique indificator" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "example@mail.xyz", description: "Email address" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: "12345678", description: "Password" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({
        example: "boolean(true || false)",
        description: "banned or not",
    })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: "bad user", description: "Ban reason" })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
