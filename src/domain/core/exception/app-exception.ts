import { Result } from '../result'
import { DomainException } from './domain-exception'

export namespace AppException {
    export class UnexpectedException extends Result<DomainException> {

        constructor(err: any) {
            super(false, {
                name: "UnexpectedException",
                message: `An unexpected error occured.`,
                error: err
            });
        }

        public static create(err: any) : UnexpectedException {
            return new UnexpectedException(err)
        }
    }
}