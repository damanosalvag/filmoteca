import axios from "axios";

const KEY_API = '1c40c07b431bd44c3eec1b5bff019241';
//https://api.themoviedb.org/3/search/movie?api_key=1c40c07b431bd44c3eec1b5bff019241&query=Jack&language=en-US

export default function getMovies(name, page) {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY_API}&query=${name}&language=en-US&page=${page}`)
        .then((response) => {
            return response;
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