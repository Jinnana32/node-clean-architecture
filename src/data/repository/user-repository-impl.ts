import { IUserRepository } from "../../domain/repository/user-repository";
import { LoginParams } from "../../domain/params/login-params";
import { UserModel } from "../models/user-model";
import { UserService } from "../services/user-service";
import { Result } from '../../domain/core/result'
import { RegisterParams } from '../../domain/params/register-params'

export class UserRepositoryImpl implements IUserRepository {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

    login(params: LoginParams) : Promise<Result<UserModel>> {
        return this.userService.login(params)
    }

    register(params: RegisterParams) : Promise<Result<UserModel>> {
        return this.userService.register(params);
    }

}