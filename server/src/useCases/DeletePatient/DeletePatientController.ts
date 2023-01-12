import { Request, Response } from "express";
import { DeletePatientUseCase } from "./DeletePatientUseCase";

export class DeletePatientController {
  constructor(private deletePatientUseCase: DeletePatientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const patientId = req.params.id;
      await this.deletePatientUseCase.execute(patientId);

      return res.status(200).json(`Patient successfully removed!`);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
