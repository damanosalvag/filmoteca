import getMovies from "./request-api";
import genresList from './genres';
import getGenres from './genres-request';

const movieName = document.getElementById('text-search');
const onSearchBtn = document.getElementById('btn-search');
const filmsRender = document.getElementById('films');
const defaultPoster = "https://firebasestorage.googleapis.com/v0/b/filmoteca-c42e2.appspot.com/o/images%2Fdefault-opt.jpg?alt=media&token=8d34f416-268a-4f03-a309-841d27ec0d59";


// render pictures
async function renderPost(posts, page, listGenres) {
    try {
        const { page, results, total_pages, total_results } = posts.data;
        const promises = results.map(async ({ poster_path, title, genre_ids, release_date, vote_average }) => {
            const genres = await genresList(genre_ids, listGenres);
            const poster = poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w342${poster_path}`;
            return `
            <figure class="movie-card">
                <a class="poster-large" href="#">
                    <img class='gallery__image' src="${poster}" alt="${title}" loading="lazy" />
                </a>
                <figcaption class="info">
                    <h3 class="card-movie-title">${title}</h3>
                    <div class="info-items">
                        <p class="info-item">
                            ${genres}
                        </p>
                        <p class="info-item">
                            ${release_date}
                        </p>
                        <p class="info-item">
                            ${vote_average}
                        </p>
                    </div>

                 </figcaption>
            </figure>`
        });
        const markup = await Promise.all(promises);
        filmsRender.innerHTML = markup.join(' ');
    }
    catch {
        return
    }
};
onSearchBtn.addEventListener('click', async () => {
    if (movieName.value != '') {
        const page = 1;
        const movieListGenres = await getGenres();
        const posts = await getMovies(movieName.value.trim(), page);
        console.log(posts)
        renderPost(posts, page, movieListGenres);
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