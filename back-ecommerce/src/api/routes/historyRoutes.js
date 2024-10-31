import express from "express";
import verifyToken from "../middlewares/verifyToken.js"
import verifyRole from "../middlewares/verifyRole.js"
import ROLE from "../../constants/role.js";
import { getAllHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole(ROLE.ADMIN), getAllHistory);


export default router;
