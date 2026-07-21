import * as v from "valibot";

const oploverzSchema = {
  query: {
    searchedAnimes: v.object({
      q: v.pipe(v.string(), v.minLength(1), v.maxLength(50)),
    }),
    filteredAnimes: v.object({
      genre: v.optional(v.string()),
      season: v.optional(v.string()),
      studio: v.optional(v.string()),
      status: v.optional(v.string()),
      type: v.optional(v.string()),
      order: v.optional(v.string()),
    }),
  },
};

export default oploverzSchema;
