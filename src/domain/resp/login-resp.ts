import { AppException } from '../core/exception/app-exception'
import { Result, Either } from '../core/result'
import { UserException } from '../core/exception/user/user-exception';

export interface LoginDTO {
    message: string,
    token: string
}

export type LoginResponse = Either<
    AppException.UnexpectedException |
    UserException.UserNotFoundException,
    Result<LoginDTO>
>