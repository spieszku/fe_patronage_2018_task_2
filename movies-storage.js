export default class MoviesStorage {
    constructor () {
        this.storagedMovies = JSON.parse(localStorage.getItem("movie"));
        this.defaultMovies = [
            {
                "id": 1,
                "title": "The Shawshank Redemption",
                "year": 1994,
                "genre": "drama",
                "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "seen": "T"
            },
            {
                "id": 2,
                "title": "The Godfather",
                "year": 1972,
                "genre": "crime",
                "summary": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                "seen": "T"
            },
            {
                "id": 3,
                "title": "The Dark Knight",
                "year": 2008,
                "genre": "action",
                "summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "seen": "T"
            },
            {
                "id": 5,
                "title": "12 Angry Men",
                "year": 1957,
                "genre": "drama",
                "summary": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
                "seen": "F"
            },
            {
                "id": 8,
                "title": "Schindler's List",
                "year": 1993,
                "genre": "biography",
                "summary": "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
                "seen": "F"
            },
            {
                "id": 13,
                "title": "Pulp Fiction",
                "year": 1994,
                "genre": "crime",
                "summary": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                "seen": "T"
            },
            {
                "id": 21,
                "title": "The Good, the Bad and the Ugly",
                "year": 1966,
                "genre": "western",
                "summary": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
                "seen": "F"
            }
        ];
    }
    getAllMovies () {
        let moviesData;
        let movieIsArray = Array.isArray(this.storagedMovies);
        if(movieIsArray){
            moviesData = this.storagedMovies;
        }
        else {
            localStorage.setItem("movie", JSON.stringify(this.defaultMovies));
            this.storagedMovies = JSON.parse(localStorage.getItem("movie"));
            moviesData = this.defaultMovies;
        }
        return moviesData;
    }
    getSingleMovie(id) {
        let movieIndex = this.storagedMovies.findIndex(function(movie) {
            return movie.id == id;
        });
        return this.storagedMovies[movieIndex];
    }
    setNewMovie(data) {
        // set Id of new movie
        let lastMovieId = Math.max.apply(Math, this.storagedMovies.map(function(obj){return obj.id;}));
        data.id = lastMovieId + 1;

        // add new movie to storagedMovies array
        this.storagedMovies.push(data);
        this.updateMoviesList(this.storagedMovies);
    }
    updateMovie(id, data) {
        let movieIndex = this.storagedMovies.findIndex(function(movie) {
            return movie.id == id;
        });
        this.storagedMovies[movieIndex] = data;
        this.updateMoviesList(this.storagedMovies);
    }
    removeMovie(id) {
        let movieIndex = this.storagedMovies.findIndex(function(movie) {
            return movie.id == id;
        });
        this.storagedMovies.splice(movieIndex, 1);
        this.updateMoviesList(this.storagedMovies);
    }
    updateMoviesList(data) {
        localStorage.setItem("movie", JSON.stringify(this.storagedMovies));
    }
}