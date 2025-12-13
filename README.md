# wajik-anime-api

REST API streaming dan download Anime subtitle Indonesia dari berbagai sumber

# Sumber:

API ini unofficial jadi ga ada kaitan dengan sumber yang tersedia...

1. otakudesu: https://otakudesu.best
2. kuramanime: https://v8.kuramanime.tel

- domain sering berubah jangan lupa pantau terus untuk edit url ada di di "src/configs/{source}.config.ts"

# Installasi App

- install NodeJS 20 || >=22
- Jalankan perintah di terminal

```sh
# clone repo
git clone https://github.com/wajik45/wajik-anime-api.git

# masuk repo
cd wajik-anime-api

# install dependensi
npm install

# menjalankan server mode development
npm run dev
```

# Build App

```sh
# build
npm run build

# menjalankan server
npm start
```

- Server akan berjalan di http://localhost:3001

# Routes

| Endpoint  | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| /{sumber} | Deskripsi ada di response sesuai dengan sumber, gunakan ext JSON Parser jika menggunakan browser |

### Contoh request

```js
(async () => {
  const response = await fetch("http://localhost:3001/otakudesu/ongoing?page=1");
  const result = await response.json();

  console.log(result);
})();
```

### Contoh response

```json
{
  "statusCode": 200,
  "statusMessage": "OK",
  "message": "",
  "data": {
    "animeList": [
      {
        "title": "Dr. Stone Season 3 Part 2",
        "poster": "https://otakudesu.cloud/wp-content/uploads/2024/01/Dr.-Stone-Season-3-Part-2-Sub-Indo.jpg",
        "episodes": "11",
        "animeId": "drstn-s3-p2-sub-indo",
        "latestReleaseDate": "05 Jan",
        "releaseDay": "Jum'at",
        "otakudesuUrl": "https://otakudesu.cloud/anime/drstn-s3-p2-sub-indo/"
      },
      {"..."}
    ]
  },
  "pagination": {
    "currentPage": 1,
    "prevPage": null,
    "hasPrevPage": false,
    "nextPage": 2,
    "hasNextPage": true,
    "totalPages": 4
  },
}
```
