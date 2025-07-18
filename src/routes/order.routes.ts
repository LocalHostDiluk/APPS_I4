import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
} from "../controllers/order.controller";

const router = Router();

router.get("/order", getOrders);
router.post("/order", createOrder);
router.patch("/order/:idOrder", updateOrder);
router.delete("/order/:idOrder", deleteOrder);

export default router;
