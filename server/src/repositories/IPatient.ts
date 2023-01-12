import { Patient } from "../entities/Patient";
import { ICreatePatientRequestDTO } from "../useCases/CreatePatient/CreatePatientDTO";
import { IUpdatePatientRequestDTO } from "../useCases/UpdatePatient/UpdatePatientDTO";

export interface IPatient {
  save(patient: Patient): Promise<Patient>;
  findByEmail(email: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  remove(id: string): Promise<void>;
  update(id: string, patient: IUpdatePatientRequestDTO): Promise<void>;
}
