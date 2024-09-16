import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes";

const app: Application = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/", routes);

export default app;
