(async function () {
    const { pathname } = location;

    if (pathname.endsWith(".html") || pathname.endsWith(".html/")) {
      location.replace("/");
    }

    const rootElement = document.getElementById("root");

    rootElement.innerHTML = `<h1 style="text-align: center; padding: 2rem 1rem;">Loading...</h1>`;

    const url = pathname === "/" ? "/view-data" : pathname + "/view-data";
    const response = await fetch(url);
    const { data } = await response.json();

    if (!response.ok) {
      rootElement.innerHTML = `<h1 style="text-align: center; padding: 2rem 1rem;">${response.status} ${response.statusText}</h1>`;
    } else {
      rootElement.innerHTML = `
        <div class="container">
            <h2>${data.message}</h2>
            <h4>Deskripsi ada di response berdasarkan sumber!</h4>
            <h4>
                Sering pantau bossku domain sumber sering berubah bisa update di
                <span class="value">"src/configs/animeConfig.ts"</span>
            </h4>
            <h4>
                Untuk menghapus sumber ada di
                <span class="value">"src/anims/{sumber yang ingin dihapus}"</span> kemudian hapus baris kode sumber yang sudah tidak diperlukan di
                <span class="value">"src/index.ts"</span> dan <span class="value">"src/controllers/mainController.ts"</span>
            </h4>
            <div class="card-wrapper">
                <h3>Sources :</h3>
                ${data.sources
                  .map((source) => {
                    return `
                        <div class="card">
                            <h4>${source.title}</h4>
                            <p>
                                <span class="key">Get</span> :
                                <a href="${source.route}">${source.route}</a>
                            </p>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        </div>
    `;
    }
})();