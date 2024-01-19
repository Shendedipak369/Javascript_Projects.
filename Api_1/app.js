const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");


const getMovieInfo = async (movie) => {
    try {
        const myApiKey = "5cf9e2e3";
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok){
        throw new Error("Unable to fetch movie data.")
        }

        const data = await response.json();
        console.log(data);

        showMovieData(data);

    } catch (error) {
        showErrorMassege("No movie found!");

    }
};

const showMovieData = (data) => {
    movieContainer.innerHTML = " ";
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement("div");

    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2>
                           <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    movieContainer.classList.remove("nobackground");

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Actors: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;

    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}
function showErrorMassege(massege) {
    movieContainer.innerHTML = `<h2>${massege}</h2>`;
    movieContainer.classList.add("nobackground");
}

const handleFormSubmition= (e)=> {
   e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== "") {
       showErrorMassege("Fetching movie information....")
        getMovieInfo(movieName);

    } else {
        showErrorMassege("Enter movie name to get movie information");
    }

}
searchForm.addEventListener('click', handleFormSubmition);
