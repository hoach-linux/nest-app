import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getUsers();
    }

    @ApiOperation({ summary: "Get user by email" })
    @ApiResponse({ status: 200, type: User })
    @Get("/:email")
    getOne(@Param("email") email: string) {
        return this.usersService.getUserByEmail(email);
    }

    @ApiOperation({ summary: "Remove user by id" })
    @ApiResponse({ status: 200 })
    @Delete(":id")
    deleteById(@Param("id") id: string) {
        return this.usersService.deleteUserById(+id);
    }
}
