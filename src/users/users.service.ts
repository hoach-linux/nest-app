import { BanUserDto } from "./dto/ban-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { RolesService } from "./../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");

        await user.$set("roles", [role.id]);

        user.roles = [role];

        return user;
    }
    async getUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        });

        return users;
    }
    async deleteUserById(id: number) {
        const deletedUser = await this.userRepository.destroy({
            where: { id: id },
        });

        return deletedUser;
    }
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
            include: { all: true },
        });

        return user;
    }
    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add("role", role.id);

            return dto;
        }

        throw new HttpException(
            "User or role are not defined",
            HttpStatus.NOT_FOUND
        );
    }
    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);

        if (!user) {
            throw new HttpException(
                "User is not defined",
                HttpStatus.NOT_FOUND
            );
        }

        user.banned = true;
        user.banReason = dto.banReason;

        await user.save();

        return user;
    }
}
