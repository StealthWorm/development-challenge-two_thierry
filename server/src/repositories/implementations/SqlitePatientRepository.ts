import { Patient } from "../../entities/Patient";
import { ICreatePatientRequestDTO } from "../../useCases/CreatePatient/CreatePatientDTO";
import { IUpdatePatientRequestDTO } from "../../useCases/UpdatePatient/UpdatePatientDTO";
import { IPatient } from "../IPatient";
import { dynamo } from "../../app";

export class SqlitePatientRepository implements IPatient {
  async save(patient: Patient): Promise<Patient> {
    const params = {
      TableName: "Patient",
      Item: patient,
    };

    await dynamo.put(params).promise();

    return patient;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const params = {
      TableName: "Patient",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const patient = await dynamo.scan(params).promise();
    console.log(patient.Items[0]);

    if (patient.Items[0] != "") {
      return patient.Items[0];
    } else {
      return null;
    }
  }

  async findById(id: string): Promise<Patient | null> {
    const params = {
      TableName: "Patient",
      Key: {
        id: id,
      },
    };

    const patient = await dynamo.get(params).promise();

    return patient.Item;
  }

  async findAll(): Promise<Patient[]> {
    const params = {
      TableName: "Patient",
      // Limit: 5,
    };

    let patients = await dynamo.scan(params).promise();

    return patients.Items;
  }

  async update(id: string, patient: IUpdatePatientRequestDTO): Promise<void> {
    const params = {
      TableName: "Patient",
      Key: {
        id: id,
      },
      ConditionExpression: "attribute_exists(id)",
      UpdateExpression:
        "set #name = :x, #email = :e, #birthDate = :y, #address = :z",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email",
        "#birthDate": "birthDate",
        "#address": "address",
      },
      ExpressionAttributeValues: {
        ":x": patient.name,
        ":e": patient.email,
        ":y": patient.birthDate,
        ":z": patient.address,
      },
    };

    await dynamo.update(params).promise();
  }

  async remove(id: string): Promise<void> {
    const params = {
      TableName: "Patient",
      Key: {
        id: id,
      },
    };

    await dynamo.delete(params).promise();
  }
}
