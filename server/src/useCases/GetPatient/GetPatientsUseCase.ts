import { IPatient } from "../../repositories/IPatient";

export class GetPatientsUseCase {
  constructor(private patientsRepository: IPatient) {}

  async execute(patientId?: string) {
    if (patientId) {
      const patient = await this.patientsRepository.findById(patientId);

      if (!patient) {
        throw new Error("Patient not found!");
      } else {
        return patient;
      }
    } else {
      const listOfPatients = await this.patientsRepository.findAll();

      if (!listOfPatients) {
        throw new Error("Empty database!");
      } else {
        return listOfPatients;
      }
    }
  }
}
