import express from "express";
import { processOrder, returnOrder } from "./controller.js";

const router = express.Router();

router.get('/orderDetails/:orderNumber', returnOrder);
router.post('/processOrder', processOrder);

export default router