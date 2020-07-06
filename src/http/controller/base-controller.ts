import * as express from 'express';
import { Logger } from '../../libs/logger/index'
import { DomainException } from '../../domain/core/exception/domain-exception';
import { type } from 'os';

abstract class BaseController {

    controllerName?: string

    constructor(controllerName: string){
        controllerName = controllerName;
    }

    /*
    *   @desc       Sub controller's implementation when executed
    *   @params     Request, Response
    */
    protected abstract executeImpl(
        req: express.Request,
        res: express.Response) : Promise<void | any>

    /*
    *   @desc       Will be responsible for checking any uncaught exception
    *               during execution on the route handler
    *   @params     Request, Response
    */
    public async execute(
        req: express.Request,
        res: express.Response
    ) : Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch(err) {
            Logger.log(`[${this.controllerName}]: Uncaugth controller error`);
            Logger.error(err);
            this.fail(res, err);
        }
    }

    public ok<T> (res: express.Response, dto?: T) {
        if(!!dto){
            res.type('application/json');
            return res.status(200).json(dto);
        }else{
            return res.status(200);
        }
    }

    public created(res: express.Response, message: string, dto?: Object) {
        return res.status(200).json({ message: message, ...dto});
    }

    public clientError(res: express.Response, message?: string) {
        return res.status(400).json({ message: message ? message : "Unexpected error" });
    }

    public unauthorized(res: express.Response, message?: string) {
        return res.status(401).json({ message: message ? message : "Unauthorized" });
    }

    public notFound(res: express.Response, message?: string) {
        return res.status(404).json({ message: message ? message : "Not found" });
    }

    public fail(res: express.Response, error?: Error | string) {
        Logger.error(error);
        return res.status(500).json({ message: error ? error.toString() : "Internal server error" })
    }

}

export default BaseController;