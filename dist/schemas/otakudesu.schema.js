import * as v from "valibot";
const otakudesuSchema = {
    query: {
        animes: v.optional(v.object({
            page: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(6), v.regex(/^([1-9]\d*)$/, "invalid page"))),
        })),
        searchedAnimes: v.object({
            q: v.pipe(v.string(), v.minLength(1), v.maxLength(50)),
        }),
    },
};
export default otakudesuSchema;
