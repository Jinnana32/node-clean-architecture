import { Result } from '../../result'
import { DomainException } from '../domain-exception'

export namespace UserException {
    export class UserNotFoundException extends Result<DomainException> {

        constructor() {
            super(false, {
                name: "UserNotFoundException",
                message: `Unable to fetch user from server`
            });
        }

        public static create() : UserNotFoundException {
            return new UserNotFoundException()
        }
    }
}