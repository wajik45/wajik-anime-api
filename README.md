# wajik-anime-api

Streaming dan download Anime subtitle Indonesia

# Sumber:

https://zoronime.com

# Installasi

-  Jalankan perintah di terminal

```sh
# clone repo
git clone https://github.com/wajik45/wajik-anime-api.git

# masuk folder
cd wajik-anime-api

# install dependensi
npm install

# jalankan server
npm start
```

-  Server akan berjalan di http://localhost:3002

# Routes

| Endpoint              | Params          | Description                |
| --------------------- | --------------- | -------------------------- |
| /home                 | page            | default page: 1            |
| /anime                | page            | default page: 1            |
| /movie                | page            | default page: 1            |
| /ongoing              | page            | default page: 1            |
| /complete             | page            | default page: 1            |
| /genre                | -               | Genre List                 |
| /genre/:slug          | :slug, page     | default page: 1            |
| /search               | query, page     | default page: 1            |
| /anime/:slug          | :slug           | Anime details              |
| /anime/:slug/:episode | :slug, :episode | Streaming & Download Anime |
| /movie/:slug          | :slug           | Streaming & Download Movie |

### Contoh request

```js
// request
(async () => {
   const res = await fetch("http://localhost:3002/movie/?page=3");
   const data = await res.json();
   console.log(data);
})();

// response
{
    "statusCode": number,
    "currentPage": number,
    "maxPage": number,
    "list": [
        {
            "url": string,
            "slug": string,
            "title": string,
            "poster": string,
            "star": string,
            "type": string
        },
        {
            ...
        }
    ]
}
```
