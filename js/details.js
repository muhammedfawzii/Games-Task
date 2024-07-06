let searchParams = location.search;
let params = new URLSearchParams(searchParams);
let id = params.get("id");
let loading = document.querySelector(".loading");

console.log(params.get("id"));

(async function () {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dd8b20bc33msh239afdf8d9e85ccp1010f8jsn40e4a08644f2",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let response = await api.json();
  console.log(response);
  displayData(response);
  loading.classList.add("d-none");
})();

function displayData(details) {
  let box = `
 
    <div class="col-sm-12 col-md-4">
                    <figure class="mt-3">
                        <img src="${details.thumbnail}" class="w-100" alt="">
            
                    </figure>
                </div>
                <div class="col-sm-12 col-md-8">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item text-reset"><a href="./index.html">home</a></li>
                                <li class="breadcrumb-item text-info" aria-current="page">${details.title}</li>
                            </ol>
                        </nav>
                        <h1 class="text-white">${details.title}</h1>
                        <p class="fw-bold text-white">Category: <span class="ground text-bg-info">${details.developer}<span/> </p>
                        <p class="fw-bold text-white">Platform: <span class=" ground text-bg-info">${details.platform}<span/></p>
                        <p class="fw-bold text-white">Status: <span class="ground fw-bolder text-bg-info">${details.status}<span/></p>
                        <p class="fw-bold fs-6 text-white">${details.description}</p>
                        <a  href="https://wwww.freetogame.com"><button class="btn btn-outline-warning fw-bold">Show Game</button></a>

                    </div>
                </div>
`;
  document.getElementById("detailsData").innerHTML = box;
  // let bgImage = details.thumbnail.replace('thumbnail', 'background')
  // document.body.style.cssText = `
  // background-image: url(${bgImage});
  // background-size: cover;
  // background-position: center center;
  // `
}
let closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function () {
  location.href = "./index.html";
});
