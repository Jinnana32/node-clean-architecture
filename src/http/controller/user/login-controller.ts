import * as express from 'express'
import BaseController from '../base-controller';
import { LoginUseCase } from '../../../domain/usecases/user/login-usecase';
import { AppException } from '../../../domain/core/exception/app-exception';
import { UserException } from '../../../domain/core/exception/user/user-exception';
import { LoginDTO } from '../../../domain/resp/login-resp';
import { DomainException } from '../../../domain/core/exception/domain-exception';

class LoginController extends BaseController {

    private loginUseCase: LoginUseCase;

    constructor(loginUseCase: LoginUseCase){
        super(`LoginController`)
        this.loginUseCase = loginUseCase;
    }

    protected async executeImpl(req: express.Request, res: express.Response) : Promise<void | any> {

        const { email, password } = req.body

        try {

            const loginOrError = await this.loginUseCase.execute({ email: email, password: password })

            // Login service failed to fetch a user from db with following exception:

            if(loginOrError.isLeft()){

                const result = loginOrError.value

                switch(result.constructor){
                    case AppException.UnexpectedException:
                        return this.fail(res, `Something went wrong. Please try again later`);
                    case UserException.UserNotFoundException:
                        return this.fail(res, (result.error as DomainException).message)
                }

            }else{
                return this.ok<LoginDTO>(res, loginOrError.value.getValue())
            }

        } catch (err) {
            return this.fail(res, err)
        }

    }

}

export default LoginController;