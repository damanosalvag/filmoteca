import { varDOM } from "./var-selector-dom";
import { getAPI } from "./request-api";


const {
    modalContainer, modalImgPoster, modalCloseBtn,
    modalTitle, modalInfoValues, modalDescMovie,
    modalWatchedBtn, modalQueueBtn, defaultPoster
} = varDOM;

export async function detailsMovieValues(id_movie) {
    const movieInfoObj = await getAPI.detailMovie(id_movie);
    const { poster_path, original_title, title, vote_average, vote_count, popularity, genres, overview, id } = movieInfoObj.data;
    
    //image poster
    if (poster_path === null) {
        modalImgPoster.src = defaultPoster;
    } else {
        modalImgPoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    }
    // title movie
    modalTitle.textContent = title;
    // film values
    const markup = `
        <li>${vote_average}/${vote_count}</li>
        <li>${popularity}</li>
        <li>${original_title}</li>
        <li>${genres.name}</li>`
    modalInfoValues.innerHTML = markup;
    // Description
    modalDescMovie.textContent = overview;
}

