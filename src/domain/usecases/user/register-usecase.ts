import { SingleUseCase } from "../../core/base/single-usecase";
import { RegisterParams } from "../../params/register-params";

import { RegisterResponse, RegisterDTO } from '../../resp/register-resp'
import { IUserRepository } from "../../repository/user-repository";
import { left, right } from "../../core/result";
import { AppException } from "../../core/exception/app-exception";
import { Result } from '../../core/result'
import { UserModel } from "../../../data/models/user-model";

export class RegisterUseCase implements SingleUseCase<RegisterParams, RegisterResponse> {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(params: RegisterParams) : Promise<RegisterResponse> {

        const userOrError = await this.userRepository.register(params);

        if(userOrError.isFailure){
            return left(AppException.UnexpectedException.create(userOrError.error))
        }

        const userModel = userOrError.getValue()
        return right(Result.ok<RegisterDTO>(
            {
                user: new UserModel(
                    userModel.email,
                    userModel.password,
                    userModel._id
                )
            }
        )) as RegisterResponse

    }

}