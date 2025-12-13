import * as v from "valibot";
const propertyType = v.union([
    v.literal("genre"),
    v.literal("season"),
    v.literal("studio"),
    v.literal("type"),
    v.literal("quality"),
    v.literal("source"),
    v.literal("country"),
]);
const sort = v.optional(v.union([
    v.literal("a-z"),
    v.literal("z-a"),
    v.literal("oldest"),
    v.literal("latest"),
    v.literal("popular"),
    v.literal("most_viewed"),
    v.literal("updated"),
]));
const page = v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(6), v.regex(/^([1-9]\d*)$/, "invalid page")));
const kuramanimeSchema = {
    query: {
        animes: v.object({
            search: v.optional(v.string()),
            status: v.optional(v.union([
                v.literal("ongoing"),
                v.literal("completed"),
                v.literal("upcoming"),
                v.literal("movie"),
            ])),
            sort,
            page,
        }),
        animesByPropertyId: v.object({
            sort,
            page,
        }),
        scheduledAnimes: v.optional(v.object({
            day: v.optional(v.union([
                v.literal("all"),
                v.literal("random"),
                v.literal("monday"),
                v.literal("tuesday"),
                v.literal("wednesday"),
                v.literal("thursday"),
                v.literal("friday"),
                v.literal("saturday"),
                v.literal("sunday"),
            ])),
            page,
        })),
    },
    param: {
        properties: v.object({
            propertyType,
        }),
        animesByPropertyId: v.object({
            propertyType,
            propertyId: v.string(),
        }),
        animeDetails: v.object({
            animeId: v.string(),
            animeSlug: v.string(),
        }),
        batchDetails: v.object({
            batchId: v.string(),
            animeId: v.string(),
            animeSlug: v.string(),
        }),
        episodeDetails: v.object({
            episodeId: v.string(),
            animeId: v.string(),
            animeSlug: v.string(),
        }),
    },
};
export default kuramanimeSchema;
