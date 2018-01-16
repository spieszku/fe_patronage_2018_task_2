import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";

let movies = new MoviesStorage();
let moviesData = movies.get();

const symbolTrue = "&#x2611";
const symbolFalse = "&#x2612";
let moviesCounterAll = moviesData.length;
let moviesCounterSeen = 0;

// display number of all movies
setCounterOfTo("#moviesCounterAll", moviesCounterAll);

// update displayed value of movies counter seen and movie status
function updateMovieSymbol(movieId, movieStatus) {
    document.querySelector("#movie-" + movieId).innerHTML = "Seen: " + movieStatus;
}

for (let [index, movieItem] of moviesData.entries()) {
    let movieStatus;
    let movieId = movieItem.id;
    // count seen movies
    if (movieItem.seen === "T") {
        moviesCounterSeen++;
        movieStatus = symbolTrue;
    }
    else {
        movieStatus = symbolFalse;
    }

    // create movieList element from moviesData
    let listedMovie = document.createElement("LI");
    listedMovie.innerHTML =
        `<p>${movieItem.title}</p>
        <p class="col-3">Year: ${movieItem.year}</p>
        <p class="col-3">Genre: ${movieItem.genre}</p>
        <p class="col-3 movie-status" id="movie-${movieId}" data-id="${movieId}"></p>
        <p>${movieItem.summary}</p>`;

        document.querySelector("#moviesList").appendChild(listedMovie);

        setCounterOfTo("#moviesCounterSeen", moviesCounterSeen);
        updateMovieSymbol(movieId, movieStatus);

        document.querySelector("#movie-" + movieItem.id).addEventListener("click", function() {
            updateMovies(this);
    });
}

function updateMovies(movie) {
    let movieId = Number(movie.getAttribute("data-id"));
    let activeMovie = movies.get(movieId);
    let movieStatus;
    if (activeMovie.seen === "F") {
        activeMovie.seen = "T";
        moviesCounterSeen++;
        movieStatus = symbolTrue;
    }
    else {
        activeMovie.seen = "F";
        moviesCounterSeen--;
        movieStatus = symbolFalse;
    }
    movies.set(movieId, activeMovie);
    setCounterOfTo("#moviesCounterSeen", moviesCounterSeen);
    updateMovieSymbol(movieId, movieStatus);
}