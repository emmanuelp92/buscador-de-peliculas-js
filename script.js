document.getElementById("searchButton").addEventListener("click", searchmovies);

let api_key = "77fa082eda23e755c4142e9de91a3c08";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImage = "https://image.tmdb.org/t/p/w500";

const resultContainer = document.getElementById("results");
function searchmovies() {
  resultContainer.innerHTML = "Cargando...";
  let searchInput = document.getElementById("searchInput").value;

  fetch(
    `${urlBase}?query=${encodeURIComponent(searchInput)}&api_key=${api_key}`
  )
    .then((response) => response.json())
    //.then((response) => console.log(response.results))
    .then((response) => displayMovies(response.results));
}

function displayMovies(movies) {
  resultContainer.innerHTML = "";

  if (resultContainer.length === 0) {
    resultContainer.innerHTML =
      "<p> No se encontraron resultados para su busqueda";
    return;
  }

  movies.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let tittle = document.createElement("h2");
    tittle.textContent = movie.tittle;

    let releaseDate = document.createElement("p");
    releaseDate.textContent = "Fecha de lanzamiento: " + movie.release_date;

    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    let posterPath = urlImage + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(tittle);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}
