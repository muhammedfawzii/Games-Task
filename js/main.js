// let gamesData = []
let loading = document.querySelector(".loading");

document.querySelectorAll(".change a").forEach(function (links) {
  links.addEventListener("click", function () {
    document.querySelector(".change .active").classList.remove("active");
    links.classList.add("active");
    const category = links.getAttribute("data-category");
    console.log(category);
    getGames(category);
  });
});
getGames("MMORPG");

async function getGames(categoryName) {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dd8b20bc33msh239afdf8d9e85ccp1010f8jsn40e4a08644f2",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
    options
  );
  const data = await api.json();
  console.log(data);
  // gamesData = data
  displayData(data);
  loading.classList.add("d-none");
}

function displayData(gamesData) {
  let cartona = ``;
  for (let i = 0; i < gamesData.length; i++) {
    let videoPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    cartona += `
<div class="col" id="scale">
    <div onmouseleave="stopVideo(event)" onmouseenter="showVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button">
        <div class="card-body" >
            <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" alt="">
                <video muted="true" preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3" src="${videoPath}"></video>
            </figure>
            <figcaption>
                <div class="hstack justify-content-between">
                    <h3 class="h6 small text-white">${gamesData[i].title}</h3>
                    <span class="badge text-bg-primary p2">Free</span>
                </div>
                <p id="font" class="card-text small text-center text-white opacity-50">${gamesData[i].short_description}</p>
            </figcaption>
        </div>
        <footer class="card-footer small hstack justify-content-between">
<span class="badge badge-color">${gamesData[i].genre}</span>
<span class="badge badge-color">${gamesData[i].platform}</span>
</footer>
    </div>
</div>
    `;
  }
  document.getElementById("gameData").innerHTML = cartona;
}

function showVideo(event) {
  let vid = event.target.querySelector("video");
  vid.classList.remove("d-none");
  vid.muted = true;
  vid.play();
}

function stopVideo(event) {
  let vid = event.target.querySelector("video");
  vid.classList.add("d-none");
  vid.muted = true;
  // vid.pa()
}

function showDetails(id) {
  location.href = `./details.html?id=${id}`;
  console.log("hello");
}
