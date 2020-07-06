// @ts-ignore
import * as express from 'express'
import { loginController, registerController } from '../container/user-container'
const router = express.Router();

router.post('/login',  (req, res) => loginController.execute(req, res));
router.post('/register', (req, res) => registerController.execute(req, res));

export default router;