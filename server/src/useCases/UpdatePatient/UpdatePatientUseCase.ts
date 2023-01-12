import { IPatient } from "../../repositories/IPatient";
import { IUpdatePatientRequestDTO } from "./UpdatePatientDTO";

export class UpdatePatientUseCase {
  constructor(private patientsRepository: IPatient) {}

  async execute(id: string, data: IUpdatePatientRequestDTO) {
    const patientAlreadyExists = await this.patientsRepository.findById(id);

    if (!patientAlreadyExists) {
      throw new Error("Patient does not exists.");
    } else {
      if (!data.name || !data.birthDate || !data.address || !data.email) {
        data.name = data.name ? data.name : patientAlreadyExists.name;
        data.birthDate = data.birthDate ? data.birthDate : patientAlreadyExists.birthDate;
        data.address = data.address ? data.address : patientAlreadyExists.address;
        data.email = data.email ? data.email : patientAlreadyExists.email;
      }
    }

    await this.patientsRepository.update(id, data);
  }
}
