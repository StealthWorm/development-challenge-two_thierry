import { Router } from "express";
import { createPatientController } from "./useCases/CreatePatient";
import { deletePatientController } from "./useCases/DeletePatient";
import { getAllPatientsController, getOnePatientController } from "./useCases/GetPatient";
import { updatePatientController } from "./useCases/UpdatePatient";

const router = Router();

router.post("/patients", async (req, res) => {
  return createPatientController.handle(req, res);
});
router.get("/patients", async (req, res) => {
  return getAllPatientsController.handle(req, res);
});
router.get("/patients/:id", async (req, res) => {
  return getOnePatientController.handle(req, res);
});
router.put("/patients/:id", async (req, res) => {
  return updatePatientController.handle(req, res);
});
router.delete("/patients/:id", async (req, res) => {
  return deletePatientController.handle(req, res);
});

export { router };
