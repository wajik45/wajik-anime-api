import express from "express";
import cors from "cors";
import PORT from "./helpers/PORT";
import OtakudesuRouter from "./anim/otakudesu/routes/otakudesu.routes";
import setPayload from "./helpers/setPayload";

const app = express();

app.use(cors());
app.use(OtakudesuRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "WAJIK ANIME API IS READY 🔥🔥",
    source: [
      {
        name: "otakudesu",
        route: "/otakudesu",
      },
    ],
  });
});

app.use("*", (req, res) => {
  res.status(404).json(
    setPayload(res, {
      message: "Not Found",
      error: true,
    })
  );
});

app.listen(PORT, () => {
  console.log(`SERVER BERJALAN DI http://localhost:${PORT}`);
});
