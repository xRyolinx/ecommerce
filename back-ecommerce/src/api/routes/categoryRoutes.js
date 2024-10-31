import express from "express";
import verifyToken from "../middlewares/verifyToken.js"
import verifyRole from "../middlewares/verifyRole.js"
import { addCategory, getCategory, getAllCategories, deleteCategory } from "../controllers/categoryControllers.js";
import ROLE from "../../constants/role.js";
import { uploadCategory } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);

router.post("/", verifyToken, verifyRole(ROLE.ADMIN), uploadCategory.single('img'), addCategory);
router.delete("/:id", verifyToken, verifyRole(ROLE.ADMIN), deleteCategory);
// router.patch("/edit", verifyToken, verifyRole(ROLE.ADMIN), addCategory);


export default router;
