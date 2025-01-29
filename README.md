# wajik-anime-api

REST API streaming dan download Anime subtitle Indonesia dari berbagai sumber

# Sumber:

API ini unofficial jadi kaga ada kaitan dengan sumber yang tersedia...
MOHON IZIN ABANG SUMBER, sumber bisa bertambah, req/dm rekomendasi situs yang bagus

1. otakudesu: https://otakudesu.cloud
2. samehadaku: https://samehadaku.mba

- domain sering berubah jangan lupa pantau terus untuk edit url ada di di "src/configs/animeConfig.ts"

# Installasi App

- NodeJS >= 20.x
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
- Untuk menghapus sumber ada di "src/anims/{sumber yang ingin dihapus}" kemudian hapus baris kode sumber yang sudah tidak diperlukan di "src/index.ts" dan "src/controllers/mainController.ts"

# Routes

| Endpoint  | Description                                                               |
| --------- | ------------------------------------------------------------------------- |
| /{sumber} | Deskripsi ada di response sesuai dengan sumber, patengin bae tuh response |

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
  "ok": true,
  "data": {
    "animeList": [
      {
        "title": "Dr. Stone Season 3 Part 2",
        "poster": "https://otakudesu.cloud/wp-content/uploads/2024/01/Dr.-Stone-Season-3-Part-2-Sub-Indo.jpg",
        "episodes": 11,
        "releaseDay": "Jum'at",
        "latestReleaseDate": "05 Jan",
        "animeId": "drstn-s3-p2-sub-indo",
        "href": "/otakudesu/anime/drstn-s3-p2-sub-indo/",
        "otakudesuUrl": "https://otakudesu.cloud/anime/drstn-s3-p2-sub-indo/"
      },
      {"..."}
    ]
  },
  "pagination": {
    "currentPage": 1,
    "hasPrevPage": false,
    "prevPage": null,
    "hasNextPage": true,
    "nextPage": 2,
    "totalPages": 4
  },
}
```

### CONTOH UI

[wajiknime](https://github.com/wajik45/wajiknime/)
[zannime](https://github.com/Fauzanmhr/zannime/)
