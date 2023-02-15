import axios from 'axios';
import apiConfig from '../config/api.config';

export async function search(value, page = 1) {
    var movies = {
        'flixhq': await axios.get(apiConfig.based_url + 'movies/flixhq/' + value + '?page=' + page),
        'dramacool': await axios.get(apiConfig.based_url + 'movies/dramacool/' + value + '?page=' + page),
    }

    return movies
}

export function searchInfo(type, id) {
    return axios.get(apiConfig.based_url + 'movies/flixhq/info?id=' + type + '/' + id);
}

export function streaming(episodeId, type, id, server = 'upcloud') {
    return axios.get(apiConfig.based_url + 'movies/flixhq/watch?episodeId=' + episodeId + '&mediaId=' + type + '/' + id + '&server=' + server);
}