"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT_1 = __importDefault(require("./helpers/PORT"));
const otakudesu_routes_1 = __importDefault(require("./anim/otakudesu/routes/otakudesu.routes"));
const setPayload_1 = __importDefault(require("./helpers/setPayload"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(otakudesu_routes_1.default);
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
    res.status(404).json((0, setPayload_1.default)(res, {
        message: "Not Found",
        error: true,
    }));
});
app.listen(PORT_1.default, () => {
    console.log(`SERVER BERJALAN DI http://localhost:${PORT_1.default}`);
});
//# sourceMappingURL=index.js.map