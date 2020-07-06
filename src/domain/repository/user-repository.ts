import { RegisterResp } from "../resp/register-resp";
import { LoginResponse } from '../resp/login-resp'
import { LoginParams } from "../params/login-params";
import { UserModel } from "../../data/models/user-model";
import { Result } from '../../domain/core/result'

export interface IUserRepository {

    login(params: LoginParams) : Promise<Result<UserModel>>

    register() : any

}