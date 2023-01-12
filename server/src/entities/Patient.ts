import { uuid } from "uuidv4";

export class Patient {
  public readonly id!: string;

  public name!: string;
  public birthDate!: Date;
  public email!: string;
  public address!: string;
  
  constructor(props: Omit<Patient, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    if(this.birthDate > new Date(Date.now())) {
      throw new Error("Invalid Date")
    }
  }
}
