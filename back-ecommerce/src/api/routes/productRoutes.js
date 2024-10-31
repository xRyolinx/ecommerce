import express from "express";
import verifyToken from "../middlewares/verifyToken.js"
import verifyRole from "../middlewares/verifyRole.js"
import { addProduct, getProduct, getAllProducts, deleteProduct } from "../controllers/productControllers.js";
import ROLE from "../../constants/role.js";
import { uploadProduct } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.post("/", verifyToken, verifyRole(ROLE.ADMIN), uploadProduct.single('img'), addProduct);
router.delete("/:id", verifyToken, verifyRole(ROLE.ADMIN), deleteProduct);
// router.put("/:id", verifyToken, verifyRole(ROLE.ADMIN), addProduct);


export default router;
