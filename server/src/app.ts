import express from "express";
import cors from "cors";
import { router } from "./routes";

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamo = new AWS.DynamoDB.DocumentClient();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(3333);

export { app, dynamo };
