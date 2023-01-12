import { SqlitePatientRepository } from "../../repositories/implementations/SqlitePatientRepository";
import { DeletePatientController } from "./DeletePatientController";
import { DeletePatientUseCase } from "./DeletePatientUseCase";

const sqlitePatientRepository = new SqlitePatientRepository();

const deletePatientUseCase = new DeletePatientUseCase(sqlitePatientRepository);

const deletePatientController = new DeletePatientController(
  deletePatientUseCase
);

export { deletePatientUseCase, deletePatientController };
