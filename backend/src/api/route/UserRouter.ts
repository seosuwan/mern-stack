import { Router } from "express";
import { UserController } from "../../controllers";

const router = Router();

router.use('/users/join', UserController.join);
router.use('/users/login',UserController.login);

export default router;