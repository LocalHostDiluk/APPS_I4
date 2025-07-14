import { Router } from "express";
import { createMenu, getMenusByRoles } from "../controllers/menu.controller";

const router = Router();

router.post("/menu", createMenu);
router.post("/menu/get", getMenusByRoles);

export default router;
