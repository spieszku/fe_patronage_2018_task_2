import MoviesStorage from "./movies-storage.js";
import setCounterOfTo from "./movies-counter.js";

let movies = new MoviesStorage();
let addMovieForm = document.getElementById("addMovieForm");

setCounterOfTo("#anotherMoviesCounterAll", movies.getAllMovies().length);
setCounterOfTo("#anotherMoviesCounterSeen", movies.getAllMovies().length);

document.querySelector("#test").addEventListener("click", function() {
    addMovie();
});

function addMovie() {
    let currentListOfMovies = movies.getAllMovies();
    let movie = {};
    let elements = addMovieForm.querySelectorAll( "input, textarea" );
    for (let element of elements) {
        let name = element.name;
        let value = element.value;
        if( name ) {
            movie[ name ] = value;
        }
    }

    // check if title, year and genre are filled
    if(movie.title.length === 0 || movie.year.length === 0 || movie.genre.length === 0) {
        alert("Title, year and genre are required!!!");
    }
    else {
        // check if year is 4 digit number
        if(movie.year > 999 && movie.year < 10000) {

            // check if title of movie is uniqe
            let movieTitleExist = currentListOfMovies.find(x => x.title === movie.title);
            if(movieTitleExist === undefined) {
                movie.seen = "T";
                movies.setNewMovie(movie);
                document.getElementById("addMovieForm").reset();
                setCounterOfTo("#anotherMoviesCounterAll",currentListOfMovies.length);
            }
            else {
                alert("Movie with this title already exist! You can't duplicate it!");
            }
        }
        else {
            alert("Year has to be 4 digit number");
        }
    }
}

