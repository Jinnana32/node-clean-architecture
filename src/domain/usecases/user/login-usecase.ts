import { SingleUseCase } from "../../core/base/single-usecase";
import { LoginParams } from "../../params/login-params";
import { LoginResponse, LoginDTO } from "../../resp/login-resp";
import { IUserRepository } from "../../repository/user-repository";
import { right, left, Result } from '../../core/result'
import { UserModel } from "../../../data/models/user-model";
import { UserException } from "../../core/exception/user/user-exception";

export class LoginUseCase implements SingleUseCase<LoginParams, LoginResponse> {

    private userRepository : IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(params: LoginParams) : Promise<LoginResponse> {
        // query service for user with matching credentials from params
        const userResult: Result<UserModel> = await this.userRepository.login(params)

        // if query fails, return exception to client
        if(userResult.isFailure){
            return left(UserException.UserNotFoundException.create())
        }

        // else return user model
        const userModel = userResult.getValue()
        return right(
            Result.ok<LoginDTO>({ message: `You have successfully logged in.`, token: "token here"})
        ) as LoginResponse
    }

}