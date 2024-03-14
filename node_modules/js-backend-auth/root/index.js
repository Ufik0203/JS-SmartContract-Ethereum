import  Express  from "express";
import { getUsers,Register, Login } from "../controller/Users.js";
import { verifyToken } from "../Mid/VerifyToken.js";

const router = Express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);

export default router;