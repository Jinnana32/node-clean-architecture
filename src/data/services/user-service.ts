import { LoginParams } from '../../domain/params/login-params'
import User, { IUser, UserModel } from '../models/user-model';
import { Model } from 'mongoose';
import { Result } from '../../domain/core/result'
import { RegisterParams } from '../../domain/params/register-params';

export class UserService {

    private userModel: Model<IUser>

    constructor(userModel: Model<IUser>) {
        this.userModel = userModel
    }

    async login(params: LoginParams) : Promise<Result<UserModel>> {

       const userDocument = await this.userModel.findOne({ email: params.email, password: params.password })

       if(userDocument){
        return Result.ok<UserModel>(new UserModel(
                userDocument?.email,
                userDocument?.password!!
            ))
       }

       return Result.fail<UserModel>(`There was an error fetching user information`);
    }

    async register(params: RegisterParams) : Promise<Result<UserModel>> {

        const makeUser = new User({
            email: params.email,
            password: params.password
        });

        const user = await makeUser.save()

        if(user){
            return Result.ok<UserModel>(new UserModel(
                user?.email,
                user?.password!!
            ))
        }

        return Result.fail<UserModel>(`There was an error creating a new account`);
    }

}