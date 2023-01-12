import { expect, describe, it } from "vitest";
import { faker } from "@faker-js/faker";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";
import { Patient } from "../../entities/Patient";
import { InMemoryPatientsRepository } from "../../repositories/in-memory/in-memory-patients-repository";
import { CreatePatientUseCase } from "../CreatePatient/CreatePatientUseCase";
import axios from "axios";

describe("update patient", async () => {
  const repo = new InMemoryPatientsRepository();
  let birthDate = new Date(Date.now() - 1);
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

  it("should not update a patient that does not exists", () => {
    const updatePatient = new UpdatePatientUseCase(repo);
    const idPatient = "7812e54b-7d32-4e6e-8713-cc180bb3761a";

    mockPatient.name = "New value";

    expect(updatePatient.execute(idPatient, mockPatient)).rejects.toThrow(
      "Patient does not exists."
    );
  });

  it("should update a patient that exists", () => {
    const updatePatient = new UpdatePatientUseCase(repo);
    const idPatient = repo.items[0].id;
    birthDate = new Date(Date.now() - 1);

    mockPatient.name = "New value";
    mockPatient.email = "New email@email.com";

    expect(updatePatient.execute(idPatient, mockPatient)).resolves.toBe(
      undefined
    );
  });

  it("should update a patient that exists", () => {
    const updatePatient = new UpdatePatientUseCase(repo);
    const idPatient = repo.items[0].id;
    birthDate = new Date(Date.now() - 100);

    mockPatient.name = "New value";
    mockPatient.email = "New email@email.com";
    mockPatient.address = "New address";
    mockPatient.birthDate = birthDate;

    expect(updatePatient.execute(idPatient, mockPatient)).resolves.toBe(
      undefined
    );
  });

  it("should  not update a patient with empty values", () => {
    const updatePatient = new UpdatePatientUseCase(repo);
    const idPatient = repo.items[0].id;

    mockPatient.name = "";

    expect(updatePatient.execute(idPatient, mockPatient)).resolves.toBe(
      undefined
    );
  });
});
