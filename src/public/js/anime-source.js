(async function () {
    function setSpasi() {
      const spasiElements = document.querySelectorAll("[data-spasi]");

      spasiElements.forEach((spasiElement) => {
        const cssValue = spasiElement.dataset.spasi;
        const dotElement = spasiElement.querySelector(".dot");

        let lightValue = 255 - 50 * Number(cssValue);
        
        if (lightValue < 0) lightValue = 0;
        
        dotElement.style.backgroundColor = `rgb(${lightValue}, ${lightValue}, ${lightValue})`;
        spasiElement.style.paddingLeft = cssValue + "rem";
      });
    }

    const { pathname } = location;

    if (pathname.endsWith(".html") || pathname.endsWith(".html/")) {
      location.replace("/");
    }

    const rootElement = document.getElementById("root");

    rootElement.innerHTML = `<h1 style="text-align: center; padding: 2rem 1rem;">Loading...</h1>`;

    const response = await fetch(pathname + "/view-data");
    const { data } = await response.json();
    
    if (!response.ok) {
      rootElement.innerHTML = `<h1 style="text-align: center; padding: 2rem 1rem;">${response.status} ${response.statusText}</h1>`;
    } else {
      if (data) {
        document.title = data.title;

        rootElement.innerHTML = `
          <div class="container">
            <h2>${data.title} is ${data.ok ? `Ready 💧🍌🚀🚀... Izin bang ${data.title}` : "not Ready 🛌😴"}</h2>
            <h4>Message : ${data.message}</h4>
            <h4>Source : <a href="${data.baseUrl}" target="_blank">${data.baseUrl}</a></h4>
            <h4><a href="/">back to home</a></h4>
            <div class="card-wrapper">
              <h3>Routes :</h3>

              ${data.routesView
                .map((route) => {
                  return `
                    <div class="card">
                      <h4>${route.title}</h4>
                      <p><span class="key"><span class="dot"></span>Get</span> : <a href="${data.baseUrlPath + route.route}" target="_blank">${data.baseUrlPath + route.route}</a></p>
                      <p><span class="key"><span class="dot"></span>Route Params</span> : <span class="value">${route.routeParams?.length > 0 ? "" : "none"}</span></p>
                      ${
                        route.routeParams?.length > 0
                        ?
                          route.routeParams.map((routeParam) => {
                            return `
                              <p data-spasi="1"><span class="key"><span class="dot"></span>Placeholder</span> : <span class="value">${routeParam.placeholder}</span></p>
                              <p data-spasi="1"><span class="key"><span class="dot"></span>Value</span> : </p>
                              <p data-spasi="2"><span class="key"><span class="dot"></span>Type</span> : <span class="value">${routeParam.value.type}</span></p>
                              <p data-spasi="2"><span class="key"><span class="dot"></span>Default Value</span> : <span class="value">${routeParam.value.default ? routeParam.value.default : "none"}</span></p>
                              <p data-spasi="2"><span class="key"><span class="dot"></span>Required</span> : <span class="value">${routeParam.value.required ? "Yes" : "No"}</span></p>
                            `;
                          }).join("")
                        :
                          ""
                      }
                      <p><span class="key"><span class="dot"></span>Query Params</span> : <span class="value">${route.queryParams && route.queryParams.length > 0 ? "" : "none"}</span></p>
                      ${
                        route.queryParams?.length > 0
                        ?
                          route.queryParams
                            .map((queryParam) => {
                              return `
                                <p data-spasi="1"><span class="key"><span class="dot"></span>Key</span> : <span class="value">${queryParam.key}</span></p>
                                <p data-spasi="1"><span class="key"><span class="dot"></span>Value</span> : </p>
                                <p data-spasi="2"><span class="key"><span class="dot"></span>Type</span> : <span class="value">${queryParam.value.type}</span></p>
                                <p data-spasi="2"><span class="key"><span class="dot"></span>Default Value</span> : <span class="value">${queryParam.value.default ? queryParam.value.default : "none"}</span></p>
                                <p data-spasi="2"><span class="key"><span class="dot"></span>Required</span> : <span class="value">${queryParam.value.required ? "Yes" : "No"}</span></p>
                              `;
                            })
                            .join("")
                        :
                          ""
                      }
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;

        setSpasi();
      }
    }
})();