import express from "express";
import verifyToken from "../middlewares/verifyToken.js"
import verifyRole from "../middlewares/verifyRole.js"
import { getAllOrders, getOrder, addOrder } from "../controllers/orderControllers.js";
import ROLE from "../../constants/role.js";

const router = express.Router();


router.get("/", verifyToken, verifyRole(ROLE.ADMIN), getAllOrders);
router.get("/:id", verifyToken, verifyRole(ROLE.ADMIN), getOrder);

router.post("/", addOrder);


export default router;
