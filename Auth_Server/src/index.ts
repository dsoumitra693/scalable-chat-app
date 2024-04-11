import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRouter } from "./route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//routes
app.use('api/v1/auth/', authRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});