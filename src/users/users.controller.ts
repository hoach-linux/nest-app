import { ValidationPipe } from "./../pipes/validation.pipe";
import { BanUserDto } from "./dto/ban-user.dto";
import { RolesGuard } from "./../auth/roles.guard";
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
    UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { AddRoleDto } from "./dto/add-role.dto";

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
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
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

    @ApiOperation({ summary: "Add role for user" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: "Ban user" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/ban")
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
