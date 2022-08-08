import { ICRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dtos/create.user.dto";
import UsersDao from '../daos/users.dao';
import { PutUserDto } from "../dtos/put.user.dto";
import { PatchUserDto } from "../dtos/patch.user.dto";

class UsersService implements ICRUD {

    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersDao.updateUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersDao.updateUserById(id, resource);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email);
    }

}

export default new UsersService();