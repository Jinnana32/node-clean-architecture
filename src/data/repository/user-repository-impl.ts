import { IUserRepository } from "../../domain/repository/user-repository";
import { LoginParams } from "../../domain/params/login-params";
import { RegisterResp } from '../../domain/resp/register-resp'
import { UserModel } from "../models/user-model";
import { UserService } from "../services/user-service";
import { Result } from '../../domain/core/result'

export class UserRepositoryImpl implements IUserRepository {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

    async login(params: LoginParams) : Promise<Result<UserModel>> {
        return this.userService.login(params)
    }

    register() : any {
        return null
    }

}