import { varDOM } from "./var-selector-dom";
import { getAPI } from "./request-api";
const { detail_movie, id_movie } = varDOM;

console.log(detail_movie);
console.log(id_movie);

// detail_movie.addEventListener('click', async () => {
//     const getDetailMovie = await getAPI.detailMovie(id_movie.dataset.id);
//     console.log(getDetailMovie);
// })
