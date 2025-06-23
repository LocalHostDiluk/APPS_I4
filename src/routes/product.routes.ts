import { Router } from "express";
import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/products", saveProduct);
router.get("/products", getProducts);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;