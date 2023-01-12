import { expect, describe, it } from "vitest";
import { DeletePatientUseCase } from "./DeletePatientUseCase";
import { Patient } from "../../entities/Patient";
import { InMemoryPatientsRepository } from "../../repositories/in-memory/in-memory-patients-repository";
import { CreatePatientUseCase } from "../CreatePatient/CreatePatientUseCase";

describe("delete patient", async () => {
  const repo = new InMemoryPatientsRepository();
  const birthDate = new Date(Date.now() - 1);
  var mockPatient = {
    name: "John",
    birthDate,
    email: "teste",
    address: "endereço qualquer",
  };

  it("should create a patient", () => {
    const createPatient = new CreatePatientUseCase(repo);
    expect(createPatient.execute(mockPatient)).resolves.toBeInstanceOf(Patient);
  });

  it("should not delete a patient that does not exists", () => {
    const deletePatient = new DeletePatientUseCase(repo);
    const idPatient = "7812e54b-7d32-4e6e-8713-cc180bb3761a";

    expect(deletePatient.execute(idPatient)).rejects.toBeInstanceOf(Error);
  });

  it("should  delete a patient that exists", () => {
    const deletePatient = new DeletePatientUseCase(repo);
    const idPatient = repo.items[0].id;

    expect(deletePatient.execute(idPatient)).resolves.toBe(undefined);
  });
});
