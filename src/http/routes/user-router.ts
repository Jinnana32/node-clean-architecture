// @ts-ignore
import * as express from 'express'
import { loginController } from '../container/user-container'
const router = express.Router();

router.post('/login',  (req, res) => loginController.execute(req, res));
//router.post('/register', register);

export default router;