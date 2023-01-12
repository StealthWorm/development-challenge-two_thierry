import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

export class UpdatePatientController {
  constructor(private updatePatientUseCase: UpdatePatientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const patientId = req.params.id;
    const { name, birthDate, email, address } = req.body;

    try {
      await this.updatePatientUseCase.execute(patientId, {
        name,
        birthDate,
        email,
        address,
      });

      return res.status(200).json(`Patient successfully updated!`);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
