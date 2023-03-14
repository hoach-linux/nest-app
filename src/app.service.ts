import { Injectable } from "@nestjs/common";


@Injectable()
export class AppService {
    getUsers() {
        return [{ id: 1, name: "Tien Hoach", lastname: "Nguyen", profesion: "Programmer" }]
    }
}