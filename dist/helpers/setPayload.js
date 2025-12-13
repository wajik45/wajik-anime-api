import http from "http";
export default function setPayload(res, props) {
    return {
        statusCode: res.statusCode,
        statusMessage: http.STATUS_CODES[res.statusCode] || "",
        message: props?.message || "",
        data: props?.data || null,
        pagination: props?.pagination || null,
    };
}
