import * as T from "../../interfaces/otakudesu.interface.js";
import mainParser from "../main/main.parser.js";
import otakudesuConfig from "../../configs/otakudesu.config.js";
const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;
const { baseUrl } = otakudesuConfig;
const otakudesuExtraParser = {
    parseOngoingCard(el) {
        const title = Text(el.querySelector("h2.jdlflm"));
        const poster = Src(el.querySelector(".thumbz img"));
        const episodes = Text(el.querySelector(".epz"), /Episode (\S+)/);
        const otakudesuUrl = AnimeSrc(el.querySelector(".thumb a"));
        const animeId = Id(el.querySelector(".thumb a"));
        const latestReleaseDate = Text(el.querySelector(".newnime"));
        const releaseDay = Text(el.querySelector(".epztipe"));
        return {
            title,
            poster,
            episodes,
            animeId,
            latestReleaseDate,
            releaseDay,
            otakudesuUrl,
        };
    },
    parseCompletedCard(el) {
        const title = Text(el.querySelector("h2.jdlflm"));
        const poster = Src(el.querySelector(".thumbz img"));
        const episodes = Text(el.querySelector(".epz"), /(\S+) Episode/);
        const otakudesuUrl = AnimeSrc(el.querySelector(".thumb a"));
        const animeId = Id(el.querySelector(".thumb a"));
        const score = Text(el.querySelector(".epztipe"));
        const lastReleaseDate = Text(el.querySelector(".newnime"));
        return {
            title,
            poster,
            episodes,
            animeId,
            score,
            lastReleaseDate,
            otakudesuUrl,
        };
    },
    parseTextCard(el) {
        const title = Text(el);
        const id = Id(el);
        const otakudesuUrl = AnimeSrc(el, baseUrl);
        return {
            title,
            id,
            otakudesuUrl,
        };
    },
    parseInfo(elems) {
        function getInfo(index) {
            const info = Text(elems[index]?.nextSibling, /:\s*(.+)/);
            return info;
        }
        return getInfo;
    },
    parseTextGenreList(elems) {
        const genreList = elems.map((el) => {
            const { id, title, otakudesuUrl } = this.parseTextCard(el);
            return {
                title,
                genreId: id,
                otakudesuUrl,
            };
        });
        return genreList;
    },
    parseTextEpisodeList(elems) {
        const episodeList = elems.map((el) => {
            const { id, title, otakudesuUrl } = otakudesuExtraParser.parseTextCard(el);
            const match = title.match(/Episode\s+(\d+)/);
            return {
                title: match ? match[1] || "0" : title,
                episodeId: id,
                otakudesuUrl,
            };
        });
        return episodeList;
    },
    parseSynopsis(elems) {
        return {
            paragraphList: elems
                .map((el) => {
                const paragraph = el.text;
                return paragraph;
            })
                .filter((paragraph) => {
                return paragraph;
            }),
        };
    },
};
export default otakudesuExtraParser;
