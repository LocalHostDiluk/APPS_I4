import {
  actualizarReporte,
  crearReporte,
  eliminarReporte,
  getReports,
} from "../controllers/report.controller";
import { Router } from "express";

const router = Router();

router.post("/crearReporte", crearReporte);
router.get("/getReports", getReports);
router.put("/actualizarReporte/:id", actualizarReporte);
router.delete("/eliminarReporte/:id", eliminarReporte);

export default router;