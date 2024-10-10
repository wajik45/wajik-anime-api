import path from "path";
import express from "express";
import cors from "cors";
import PORT from "./helpers/PORT";
import MainRouter from "./routes/main.routes";
import otakudesu from "./anims/otakudesu/otakudesu.info";
import OtakudesuRouter from "./anims/otakudesu/routes/otakudesu.routes";
import samehadaku from "./anims/samehadaku/samehadaku.info";
import SamehadakuRouter from "./anims/samehadaku/routes/samehadaku.routes";

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));

// SUMBER
app.use(otakudesu.baseRoute, OtakudesuRouter);
app.use(samehadaku.baseRoute, SamehadakuRouter);

// HAHAHAHHAHAHA
app.use(MainRouter);

app.listen(PORT, () => {
  console.log(`SERVER BERJALAN DI http://localhost:${PORT}`);
});
