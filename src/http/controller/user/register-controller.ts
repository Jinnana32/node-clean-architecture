import BaseController from "../base-controller";
import { AppException } from '../../../domain/core/exception/app-exception';
import { UserException } from '../../../domain/core/exception/user/user-exception';
import { DomainException } from '../../../domain/core/exception/domain-exception';
import * as express from 'express'
import { RegisterUseCase } from "../../../domain/usecases/user/register-usecase";
import { RegisterDTO } from "../../../domain/resp/register-resp";

class RegisterController extends BaseController {

    private registerUseCase: RegisterUseCase

    constructor(registerUseCase: RegisterUseCase) {
        super(`RegisterController`)
        this.registerUseCase = registerUseCase;
    }

    protected async executeImpl(req: express.Request, res: express.Response) : Promise<void | any> {
        const { email, password } = req.body
        try {
            const registerOrError = await this.registerUseCase.execute({ email: email, password: password })

            if(registerOrError.isLeft()){
                const result = registerOrError.value
                switch(result.constructor){
                    case AppException.UnexpectedException:
                        return this.fail(res, `Something went wrong. Please try again later`);
                    case UserException.UserNotFoundException:
                        return this.fail(res, (result.error as DomainException).message)
                }
            }else{
                return this.ok<RegisterDTO>(res, registerOrError.value.getValue())
            }
        } catch (err) {
            this.fail(res, err)
        }
    }

}

export default RegisterController;