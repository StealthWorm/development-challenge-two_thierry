import { expect, describe, it } from "vitest";
import { faker } from "@faker-js/faker";
import { GetPatientsUseCase } from "./GetPatientsUseCase";
import { Patient } from "../../entities/Patient";
import { InMemoryPatientsRepository } from "../../repositories/in-memory/in-memory-patients-repository";
import { CreatePatientUseCase } from "../CreatePatient/CreatePatientUseCase";

describe("Get all patients", async () => {
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
    expect(createPatient.execute(mockPatient)).resolves.toBeInstanceOf(Patient);
  });

  it("should retrieve all existing patients", () => {
    const getPatients = new GetPatientsUseCase(repo);

    expect(getPatients.execute()).resolves.not.toEqual([]);
    expect(getPatients.execute()).resolves.toHaveLength(2);
  });

  it("should return only one patient, if exists", () => {
    const getPatients = new GetPatientsUseCase(repo);
    const idPatient = repo.items[0].id;

    expect(getPatients.execute(idPatient)).resolves.toContain(mockPatient);
  });

  it("should return empty when nothing was created", () => {
    const repo = new InMemoryPatientsRepository();
    const getPatients = new GetPatientsUseCase(repo);

    expect(getPatients.execute()).resolves.toEqual([]);
  });
});
