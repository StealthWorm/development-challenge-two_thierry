import { SqlitePatientRepository } from "../../repositories/implementations/SqlitePatientRepository";
import { GetAllPatientsController } from "./GetAllPatientsController";
import { GetOnePatientController } from "./GetOnePatientController";
import { GetPatientsUseCase } from "./GetPatientsUseCase";

const sqlitePatientRepository = new SqlitePatientRepository();

const getPatientsUseCase = new GetPatientsUseCase(sqlitePatientRepository);

const getAllPatientsController = new GetAllPatientsController(
  getPatientsUseCase
);

const getOnePatientController = new GetOnePatientController(
  getPatientsUseCase
);

export { getPatientsUseCase, getAllPatientsController, getOnePatientController };
