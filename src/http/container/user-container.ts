import User  from '../../data/models/user-model'
import { UserService } from '../../data/services/user-service'
import { UserRepositoryImpl } from '../../data/repository/user-repository-impl'
import { IUserRepository } from '../../domain/repository/user-repository'
import { LoginUseCase } from '../../domain/usecases/user/login-usecase'
import LoginController  from '../controller/user/login-controller'
import { RegisterUseCase } from '../../domain/usecases/user/register-usecase'
import RegisterController from '../controller/user/register-controller'

// Inject User model to User service
const userService: UserService = new UserService(User)

// Inject User service to Repository
const userRepositoryImpl: IUserRepository = new UserRepositoryImpl(userService)

// Login controller bundle
const loginUseCase: LoginUseCase = new LoginUseCase(userRepositoryImpl)
const loginController: LoginController = new LoginController(loginUseCase);

// Register controller bundle
const registerUseCase: RegisterUseCase = new RegisterUseCase(userRepositoryImpl);
const registerController: RegisterController = new RegisterController(registerUseCase);

export { loginController, registerController };
