

export default async function genresList(ids_movie, movieListGenres) {
    const genres = movieListGenres.filter(movie => ids_movie.includes(movie.id)).map(genre => genre.name);
    return genres;
};