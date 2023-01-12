import { test, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Patient } from "./Patient";

test("create a new patient", () => {
  const patient = new Patient({
    name: "John Doe",
    birthDate: new Date(),
    email: "John@gmail.com",
    address: "complete address",
  });

  expect(patient).toBeInstanceOf(Patient);
  expect(patient.name).toEqual("John Doe");
});

test("cannot create a new patient with birth date greater than now", () => {
  const birthDate = new Date();

  birthDate.setDate(birthDate.getDate() + 1);

  const patient = {
    name: faker.name.fullName(),
    birthDate,
    email: `${faker.name.firstName()}@gmail.com`,
    address: faker.address.street(),
  };

  expect(() => {
    return new Patient(patient);
  }).toThrow();
});
