import { IPatient } from "../../repositories/IPatient";

export class DeletePatientUseCase {
  constructor(private patientsRepository: IPatient) {}

  async execute(id: string) {
    const patientAlreadyExists = await this.patientsRepository.findById(id);

    if (!patientAlreadyExists) {
      throw new Error("Patient does not exists.");
    } 

    await this.patientsRepository.remove(id);
  }
}
