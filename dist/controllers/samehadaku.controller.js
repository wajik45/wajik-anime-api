import samehadakuConfig from "../configs/samehadaku.config.js";
import setPayload from "../helpers/setPayload.js";
const { baseUrl } = samehadakuConfig;
const samehadakuController = {
    async getRoot(req, res, next) {
        res.json(setPayload(res, {
            message: "Status: OFF",
        }));
    },
};
export default samehadakuController;
