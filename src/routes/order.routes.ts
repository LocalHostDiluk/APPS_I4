import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/order.controller";

const router = Router();

router.post("/order", createOrder);
router.patch("/order/:idOrder", updateOrder);
router.delete("/order/:idOrder", deleteOrder);

export default router;