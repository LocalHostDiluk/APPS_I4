import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller";

const router = Router();

router.get("/role", getRoles);
router.post("/role", createRole);

export default router;
