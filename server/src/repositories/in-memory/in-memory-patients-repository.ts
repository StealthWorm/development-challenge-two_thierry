import { Patient } from "../../entities/Patient";
import { ICreatePatientRequestDTO } from "../../useCases/CreatePatient/CreatePatientDTO";
import { IUpdatePatientRequestDTO } from "../../useCases/UpdatePatient/UpdatePatientDTO";
import { IPatient } from "../IPatient";

export class InMemoryPatientsRepository implements IPatient {
  public items: Patient[] = [];

  async save(patient: ICreatePatientRequestDTO): Promise<Patient> {
    const newPatient = new Patient(patient);
    this.items.push(newPatient);
    return newPatient;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const existingPatient = this.items.find((patient) => {
      return patient.email == email;
    });

    if (!existingPatient) {
      return null;
    } else {
      return existingPatient;
    }
  }

  async findById(id: string): Promise<Patient | null> {
    const existingPatient = this.items.find((patient) => {
      return patient.id === id;
    });

    if (!existingPatient) {
      return null;
    } else {
      return existingPatient;
    }
  }

  async findAll(): Promise<Patient[]> {
    return this.items;
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }

  async update(id: string, patient: IUpdatePatientRequestDTO): Promise<void> {
    let updatedItem = this.items.find((element) => {
      return element.id === id;
    });

    if (updatedItem) {
      if (patient.name) {
        updatedItem.name = patient.name;
      }
      if (patient.email) {
        updatedItem.email = patient.email;
      }
      if (patient.address) {
        updatedItem.address = patient.address;
      }
      if (patient.birthDate && updatedItem) {
        updatedItem.birthDate = patient.birthDate;
      }
    }
  }
}
