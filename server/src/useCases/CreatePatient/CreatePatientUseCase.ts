import { Patient } from "../../entities/Patient";
import { IPatient } from "../../repositories/IPatient";
import { ICreatePatientRequestDTO } from "./CreatePatientDTO";

// unica responsabilidade é a criação do paciente
export class CreatePatientUseCase {
  constructor(private patientsRepository: IPatient) {}

  async execute(data: ICreatePatientRequestDTO) {
    if (!data.address || !data.birthDate || !data.email || !data.name) {
      throw new Error("One or more fields are missing!");
    }
    
    if(data.birthDate >= new Date()) {
      throw new Error("Invalid Date")
    }

    const patientAlreadyExists = await this.patientsRepository.findByEmail(
      data.email
    );

    if (patientAlreadyExists) {  
      throw new Error("Patient already exists.");
    }

    const newPatient = new Patient(data);
    const createdPatient = await this.patientsRepository.save(newPatient);
    return createdPatient;
  }
}
