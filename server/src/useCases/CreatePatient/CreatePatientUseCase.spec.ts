import { expect, describe, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreatePatientUseCase } from "./CreatePatientUseCase";
import { Patient } from "../../entities/Patient";
import { InMemoryPatientsRepository } from "../../repositories/in-memory/in-memory-patients-repository";

describe("create patient", async () => {
  it("should create a patient", () => {
    const repo = new InMemoryPatientsRepository();
    const createPatient = new CreatePatientUseCase(repo);
    const birthDate = new Date(Date.now() - 1);

    expect(
      createPatient.execute({
        name: "John",
        birthDate,
        email: "teste",
        address: "endereço qualquer",
      })
    ).resolves.toBeInstanceOf(Patient);
  });

  it("should not create a patient with missing Data", () => {
    const repo = new InMemoryPatientsRepository();
    const createPatient = new CreatePatientUseCase(repo);
    const birthDate = new Date(Date.now() - 1);

    expect(
      createPatient.execute({
        name: "",
        birthDate,
        email: "",
        address: "endereço qualquer",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
