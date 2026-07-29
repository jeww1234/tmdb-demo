const API_KEY = "aa8830bf24a30fe8fd1dbb2fc4389c1b"; // 여기에 본인의 TMDB API 키 입력
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`;

let movies = [];
let currentIndex = 0;

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    const data = await response.json();
    movies = data.results;

    const container = document.getElementById("movies");
    container.innerHTML = "";

    if (movies.length > 0) {
      showMovie(currentIndex);
    }

    // ... 영화 카드 생성 로직 ...
  } catch (error) {
    console.error("영화 데이터를 불러오는 중 오류 발생:", error);

    // 영화 목록 영역 에러 메시지
    const container = document.getElementById("movies");
    container.innerHTML = `
  <div class="error-message">
    ❌ 영화 데이터를 불러오는 중 오류가 발생했습니다.<br>
    API 키를 확인하거나 잠시 후 다시 시도해주세요.
  </div>
`;

    // 메인 영역 에러 메시지
    const main = document.querySelector(".main");
    main.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;color:#f00;font-size:20px;text-align:center;">
        ⚠️ 메인 영역 데이터를 불러올 수 없습니다.<br>
        API 키를 확인하거나 네트워크 상태를 점검해주세요.
      </div>
    `;
  }
}

async function showMovie(index) {
  const movie = movies[index];
  const infoContainer = document.getElementById("movieInfo");
  infoContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  `;

  try {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=ko-KR`;
    const response = await fetch(trailerUrl);
    if (!response.ok) {
      throw new Error(`트레일러 요청 실패: ${response.status}`);
    }
    const data = await response.json();

    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    const trailerContainer = document.getElementById("trailerPlayer");

    if (trailer) {
      trailerContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `;
    } else {
      trailerContainer.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100%;color:#fff;font-size:20px;">
          🎬 트레일러 영상이 없습니다
        </div>
      `;
    }
  } catch (error) {
    console.error("트레일러를 불러오는 중 오류 발생:", error);

    const trailerContainer = document.getElementById("trailerPlayer");
    trailerContainer.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100%;color:#f00;font-size:18px;">
        ⚠️ 트레일러를 불러오는 중 오류가 발생했습니다.<br>
        네트워크 상태나 API 키를 확인해주세요.
      </div>
    `;
  }

  document.getElementById("prevBtn").style.display =
    index === 0 ? "none" : "block";
  document.getElementById("nextBtn").style.display =
    index === movies.length - 1 ? "none" : "block";
}

fetchMovies();
