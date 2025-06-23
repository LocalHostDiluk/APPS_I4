import { Router } from "express";
import {
  login,
  getTimeToken,
  updateToken,
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller";


const router = Router();

router.post("/login", login);
router.get("/timetoken", getTimeToken);
router.patch("/update/:userId", updateToken);
router.get("/users", getAllUsers);
router.post("/users", saveUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
