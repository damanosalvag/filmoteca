import getMovies from "./request-api";
import getGenres from './genres-request';
import { varDOM } from "./var-selector-dom";
import { renderPost } from "./renderPost";
import getTrending from "./request-trending";

const { movieName, onSearchBtn } = varDOM;
const page = 1;
let movListGen;


async function renderMoviesInit() {
    const postTrending = await getTrending();
    const movieListGenres = await getGenres();
    movListGen = movieListGenres.slice();
    renderPost(postTrending, page, movieListGenres);
}

renderMoviesInit();



onSearchBtn.addEventListener('click', async () => {
    if (movieName.value != '') {
        const posts = await getMovies(movieName.value.trim(), page);
        renderPost(posts, page, movListGen);
    } else {
        return window.alert('Please write something!');
    }
});
movieName.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        onSearchBtn.click();
    }
});