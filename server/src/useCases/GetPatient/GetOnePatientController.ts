import { Request, Response } from "express";
import { GetPatientsUseCase } from "./GetPatientsUseCase";

export class GetOnePatientController {
  constructor(private getPatientUseCase: GetPatientsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const patientId = req.params.id;
      const patient = await this.getPatientUseCase.execute(patientId);

      return res.status(201).json(patient);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
