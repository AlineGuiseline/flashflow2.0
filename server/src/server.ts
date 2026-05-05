import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { initDB } from "./database/init";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

initDB();

app.listen(process.env.PORT, () => {
  console.log("Server rodando 🚀");
});
