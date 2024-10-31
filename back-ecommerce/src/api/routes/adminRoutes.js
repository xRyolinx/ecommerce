import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authControllers.js";
import { getAdmin, getAllAdmins, deleteAdmin } from "../controllers/adminControllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js"
import ROLE from "../../constants/role.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/", verifyToken, verifyRole(ROLE.ADMIN), getAllAdmins);
router.get("/:id", verifyToken, verifyRole(ROLE.ADMIN), getAdmin);
router.delete("/:id", verifyToken, verifyRole(ROLE.ADMIN), verifyRole(ROLE.SELF), deleteAdmin);


export default router;
