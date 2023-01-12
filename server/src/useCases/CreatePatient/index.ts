import { SqlitePatientRepository } from "../../repositories/implementations/SqlitePatientRepository";
import { CreatePatientController } from "./CreatePatientController";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

const sqlitePatientRepository = new SqlitePatientRepository();

const createPatientUseCase = new CreatePatientUseCase(sqlitePatientRepository);

const createPatientController = new CreatePatientController(
  createPatientUseCase
);

export { createPatientUseCase, createPatientController };
