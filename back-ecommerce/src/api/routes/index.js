import express from 'express';
import adminRoutes from './adminRoutes.js'
import productRoutes from "./productRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import historyRoutes from "./historyRoutes.js"

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/history', historyRoutes);


export default router;
