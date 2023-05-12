import axios from "axios";

const KEY_API = '1c40c07b431bd44c3eec1b5bff019241';

export default function getGenres() {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_API}&language=en-US`)
        .then((response) => {
            console.log(response.data.genres);
            return response.data.genres;
        })
        .catch(error => {
            switch (true) {
                case error.response.status === 401:
                    console.log(error.status_message);
                    break;
                case error.response.status === 404:
                    console.log(error.status_message);
                    break;
                default:
                    console.log(`Something went wrong!`);
            };
        });
};         