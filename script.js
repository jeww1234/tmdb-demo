const API_KEY = "aa8830bf24a30fe8fd1dbb2fc4389c1b"; // 여기에 본인의 TMDB API 키 입력
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`;

let movies = [];
let currentIndex = 0;

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    movies = data.results;

    const container = document.getElementById("movies");
    container.innerHTML = "";

    if (movies.length > 0) {
      showMovie(currentIndex);
    }

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      const poster = document.createElement("img");
      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      poster.alt = movie.title;

      const title = document.createElement("div");
      title.classList.add("movie-title");
      title.textContent = movie.title;

      card.appendChild(poster);
      card.appendChild(title);
      container.appendChild(card);
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      if (currentIndex < movies.length - 1) {
        currentIndex++;
        showMovie(currentIndex);
      }
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showMovie(currentIndex);
      }
    });
  } catch (error) {
    console.error("영화 데이터를 불러오는 중 오류 발생:", error);
  }
}

async function showMovie(index) {
  const movie = movies[index];
  // 왼쪽 정보 업데이트
  const infoContainer = document.getElementById("movieInfo");
  infoContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  `;

  // 오른쪽 트레일러 업데이트
  try {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=ko-KR`;
    const response = await fetch(trailerUrl);
    const data = await response.json();

    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    const trailerContainer = document.getElementById("trailerPlayer");

    if (trailer) {
      trailerContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `;
    } else {
      // 트레일러가 없을 경우
      trailerContainer.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100%;color:#fff;font-size:20px;">
          🎬 트레일러 영상이 없습니다
        </div>
      `;
    }
  } catch (error) {
    console.error("트레일러를 불러오는 중 오류 발생:", error);
  }

  // 화살표 표시 여부
  document.getElementById("prevBtn").style.display =
    index === 0 ? "none" : "block";
  document.getElementById("nextBtn").style.display =
    index === movies.length - 1 ? "none" : "block";
}

fetchMovies();
