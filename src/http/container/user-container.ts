import User  from '../../data/models/user-model'
import { UserService } from '../../data/services/user-service'
import { UserRepositoryImpl } from '../../data/repository/user-repository-impl'
import { IUserRepository } from '../../domain/repository/user-repository'
import { LoginUseCase } from '../../domain/usecases/user/login-usecase'
import LoginController  from '../controller/user/login-controller'

// Inject User model to User service
const userService: UserService = new UserService(User)

// Inject User service to Repository
const userRepositoryImpl: IUserRepository = new UserRepositoryImpl(userService)

// Inject User repository to Login UseCase
const loginUseCase: LoginUseCase = new LoginUseCase(userRepositoryImpl)

// Inject Login UseCase to LoginController
const loginController: LoginController = new LoginController(loginUseCase);

export { loginController };
