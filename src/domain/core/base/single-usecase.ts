export interface SingleUseCase<IRequest, IResponse> {
    execute(request: IRequest) : Promise<IResponse> | IResponse;
}