export interface SingleUseCaseNoParam<IResponse> {
    execute() : Promise<IResponse> | IResponse;
}