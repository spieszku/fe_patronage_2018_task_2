import setCounterOfTo from "./movies-counter.js";

const symbolTrue = "&#x2611";
const symbolFalse = "&#x2612";
let moviesCounterAll = moviesData.length;
let moviesCounterSeen = 0;

// display number of all movies
setCounterOfTo("All", moviesCounterAll);

// update displayed value of movies counter seen and movie status
function updateMovieSymbol(index, movieStatus) {
    document.querySelector("#movie-" + index).innerHTML = "Seen: " + movieStatus;
}

for (let [index, movieItem] of moviesData.entries()) {
    let movieStatus;
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
        "<p>" + movieItem.title + "</p>" +
        "<p class='col-3'>Year: " + movieItem.year + "</p>" +
        "<p class='col-3'>Genre: " + movieItem.genre + "</p>" +
        "<p class='col-3 movie-status' id='movie-" + index + "' data-id='" + index + "'></p>" +
        "<p>" + movieItem.summary + "</p>";

        document.querySelector("#moviesList").appendChild(listedMovie);


        setCounterOfTo("Seen", moviesCounterSeen);
        updateMovieSymbol(index, movieStatus);

        document.querySelector("#movie-" + index).addEventListener("click", function() {
            updateMovies(this);
    });
}

function updateMovies(movie) {
    let movieId = movie.getAttribute("data-id");
    let activeMovie = moviesData[movieId];
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
    setCounterOfTo("Seen",moviesCounterSeen);
    updateMovieSymbol(movieId, movieStatus);
}