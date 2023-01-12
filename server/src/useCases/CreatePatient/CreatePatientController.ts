import { Request, Response } from "express";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

// unica responsabilidade é receber a requisição http do usuário , processar atraves do useCase e retornar uma resposta
export class CreatePatientController {
  constructor(private createPatientUseCase: CreatePatientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, birthDate, email, address } = req.body;

    try {
      const result = await this.createPatientUseCase.execute({
        name,
        birthDate,
        email,
        address,
      });

      return res.status(201).json(`Patient ${result.name} successfully created!`);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
