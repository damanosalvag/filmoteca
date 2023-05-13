import {getAPI} from "./request-api";
import { varDOM } from "./var-selector-dom";
import { renderPost } from "./renderPost";

const { movieName, onSearchBtn } = varDOM;
const page = 1;
let movListGen;

async function renderPostAsync(data, page, movListGen) {
  return new Promise((resolve) => {
    const renderedHTML = renderPost(data, page, movListGen);
    resolve(renderedHTML);
  });
}


async function renderMoviesInit() {
    const postTrending = await getAPI.trendMovies();
    const movieListGenres = await getAPI.genres();
    movListGen = movieListGenres.slice();
    await renderPostAsync(postTrending, page, movieListGenres);

    const detail_movie = document.querySelectorAll('.movie-card');
    const modal = document.querySelector('#myModal');
    const content = modal.querySelector('.content');
    const closeBtn = document.querySelector('.close');

    detail_movie.forEach(movie => {
        const id_movie = movie.querySelector('a');
        movie.addEventListener('click', () => {
            modal.style.display = "block";
            content.textContent = id_movie.dataset.id;
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });


}

renderMoviesInit();

onSearchBtn.addEventListener('click', async () => {
    if (movieName.value != '') {
        const posts = await getAPI.movies(movieName.value.trim(), page);
        await renderPostAsync(posts, page, movListGen);
        
            // const detail_movie = document.querySelector('.movie-card');
            // const modal = document.querySelector('#myModal');
            // const closeBtn = document.querySelector('.close');
            // const id_movie = document.querySelector('figure');
    
            // detail_movie.addEventListener('click', () => {
            //     modal.style.display = "block";

            // });
    
            // closeBtn.addEventListener('click', () => {
            //     modal.style.display = "none";
            // });
           
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


