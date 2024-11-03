import moduleAlias from "module-alias";
import path from "path";

const src = (paths: string[]) => path.join(__dirname, "..", ...paths);

moduleAlias.addAliases({
  "@otakudesu": src(["anims", "otakudesu"]),
  "@samehadaku": src(["anims", "samehadaku"]),
  "@configs": src(["configs"]),
  "@controllers": src(["controllers"]),
  "@helpers": src(["helpers"]),
  "@interfaces": src(["interfaces"]),
  "@libs": src(["libs"]),
  "@middlewares": src(["middlewares"]),
  "@routes": src(["routes"]),
  "@scrapers": src(["scrapers"]),
  "@services": src(["services"]),
});

moduleAlias();
