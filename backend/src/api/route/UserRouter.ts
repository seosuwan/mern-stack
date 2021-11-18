import { Router } from "express";
import { UserController } from "../../controllers";

const router = Router();

router.use('/join', UserController.join);
router.use('/login',UserController.login);

export default router;