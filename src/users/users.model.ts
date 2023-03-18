import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: "1", description: "Unique indificator"})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: "example@mail.xyz", description: "Email address"})
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    email: string

    @ApiProperty({example: "12345678", description: "Password"})
    @Column({ type: DataType.STRING, allowNull: true })
    password: string

    @ApiProperty({example: "boolean(true || false)", description: "banned or not"})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({example: "bad user", description: "Ban reason"})
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string
}