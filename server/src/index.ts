import express, { Request, Response } from "express";
import cors from "cors";
import { ApiRoutes } from "./routes/apiRoutes";
import listEndpoints from "express-list-endpoints";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running.");
});

const apiRoutes = new ApiRoutes();
app.use("/api", apiRoutes.router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(listEndpoints(app));
});
