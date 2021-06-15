const url = "http://www.omdbapi.com/?i=tt3896198&apikey=2b8ca5b1&s=";

$(document).ready(() => {
  const formSubmit = $("#submit__form");
  formSubmit.on("submit", (e) => {
    const searchText = $("#submit__input").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

// get movies
function getMovies(searchText) {
  axios(url + searchText)
    .then((response) => {
      const movies = response.data.Search;
      let output = "";

      $.each(movies, (index, movie) => {
        output += `
				<div class="movies__box">
				<div class="box__img">
					<img
						src="${movie.Poster}"
						alt=""
					/>
				</div>
				<div class="box__content">
					<h2>${movie.Title}</h2>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Deleniti excepturi ex qui atque delectus quod dolore est
						facilis! Fugit, tempora! ${movie.Year}
					</p>
					<button onclick="movieSelected('${movie.imdbID}')" class="btn__info">Movie Info</button>
				</div>
			</div>
				`;
      });

      $(".movies__inner").html(output);
    })
    .catch((error) => {
      // Check error
      alert(error);
    });
}

// movie info
function movieSelected(id) {
  localStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = localStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=2b8ca5b1")
    .then((response) => {
      const data = response.data;

      let output = `
			<div class="info__img">
            <img
              src="${data.Poster}"
              alt=""
            />
          </div>
          <div class="info__content">
            <h1>${data.Title}</h1>
            <ul>
              <li><strong>Genre : </strong>${data.Genre}</li>
              <li><strong>Release : </strong>${data.Released}</li>
              <li><strong>Rated : </strong>${data.Rated}</li>
              <li><strong>Imdb Rating : </strong>${data.imdbRating}</li>
              <li><strong>Director : </strong>${data.Director}</li>
              <li><strong>Writer : </strong>${data.Writer}</li>
              <li><strong>Actors : </strong>${data.Actors}</li>
            </ul>
          </div>
			`;
      $(".info__inner").html(output);
    });
}
