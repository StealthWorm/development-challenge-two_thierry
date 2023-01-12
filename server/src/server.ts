// import { PrismaClient } from "@prisma/client";
// import { convertTimeZoneToDate } from "./utils/convertTimeZoneToDate";
// import { calculateBill } from "./utils/calculateBill";
// import { app } from "./app";

// const prisma = new PrismaClient({
//   log: ["query"],
// });

// // CREATE new Patient into database
// app.post("/patients", async (req, res) => {
//   const body: any = req.body;

//   const patient = await prisma.patient.create({
//     data: {
//       name: body.name,
//       birthDate: body.birthDate,
//       email: body.email,
//       address: body.address,
//     },
//   });

//   return res.status(201).json(patient);
// });

// // READ all Patients from database
// app.get("/patients", async (req, res) => {
//   const patients = await prisma.patient.findMany();

//   return res.status(200).json(patients);
// });

// // UPDATE data from specific Patient
// app.put("/patients/:id", async (req, res) => {
//   const patientId = req.params.id;
//   const patient = req.body;

//   const updatedPatient = await prisma.patient.update({
//     where: {
//       id: patientId,
//     },
//     data: {
//       name: patient.name,
//       birthDate: patient.birthDate,
//       email: patient.email,
//       address: patient.address,
//     },
//   });

//   return res.status(200).json(updatedPatient);
// });

// //DELETE one Patient by Id from database
// app.delete("/patients/:id", async (req, res) => {
//   const patientId = req.params.id;

//   try {
//     const patient = await prisma.patient.delete({
//       where: {
//         id: patientId,
//       },
//     });

//     return res.status(200).json(`Cliente removido com sucesso!`);
//   } catch (err) {
//     return res.status(404).json("Registro não encontrato !");
//   }
// });

// app.listen(3333);

// export { prisma };
