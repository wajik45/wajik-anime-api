import express from "express";
import cors from "cors";
import { PORT } from "./helpers/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
