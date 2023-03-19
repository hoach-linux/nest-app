import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }
  async getUsers() {
    const users = await this.userRepository.findAll();

    return users;
  }
  async deleteUserById(id: number) {
    const deletedUser = await this.userRepository.destroy({
      where: { id: id },
    });

    return deletedUser;
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    return user;
  }
}
