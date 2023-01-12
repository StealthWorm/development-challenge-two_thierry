import { Request, Response } from "express";
import { GetPatientsUseCase } from "./GetPatientsUseCase";

export class GetAllPatientsController {
  constructor(private getPatientUseCase: GetPatientsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listOfPatients = await this.getPatientUseCase.execute();

      return res.status(201).json(listOfPatients);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
