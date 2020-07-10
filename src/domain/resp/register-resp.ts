import { AppException } from '../core/exception/app-exception'
import { Result, Either } from '../core/result'
import { UserModel } from '../../data/models/user-model';

export interface RegisterDTO {
    user: UserModel
}

export type RegisterResponse = Either<
    AppException.UnexpectedException,
    Result<RegisterDTO>
>