import { SqlitePatientRepository } from "../../repositories/implementations/SqlitePatientRepository";
import { UpdatePatientController } from "./UpdatePatientController";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

const sqlitePatientRepository = new SqlitePatientRepository();

const updatePatientUseCase = new UpdatePatientUseCase(sqlitePatientRepository);

const updatePatientController = new UpdatePatientController(
  updatePatientUseCase
);

export { updatePatientUseCase, updatePatientController };
