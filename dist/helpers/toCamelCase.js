"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(string) {
    return string
        .split(" ")
        .map((item, index) => {
        if (index === 0) {
            item = item.toLowerCase();
        }
        else {
            item = item.toLowerCase();
            item = item[0].toUpperCase() + item.slice(1);
        }
        return item;
    })
        .join(" ")
        .replace(/[!@#$%^&*]| /g, "");
}
exports.default = default_1;
