import { LoginParams } from "../params/login-params";
import { UserModel } from "../../data/models/user-model";
import { Result } from '../../domain/core/result'
import { RegisterParams } from '../params/register-params'

export interface IUserRepository {

    login(params: LoginParams) : Promise<Result<UserModel>>

    register(params: RegisterParams) : Promise<Result<UserModel>>

}