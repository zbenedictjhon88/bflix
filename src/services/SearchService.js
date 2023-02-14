import axios from 'axios';
import apiConfig from '../config/api.config';

export async function search(value) {
    return axios.get(apiConfig.based_url + 'movies/flixhq/' + value);
}

export function searchInfo(type, id) {
    return axios.get(apiConfig.based_url + 'movies/flixhq/info?id=' + type + '/' + id);
}

export function streaming(episodeId, type, id, server) {
    return axios.get(apiConfig.based_url + 'movies/flixhq/watch?episodeId=' + episodeId + '&mediaId=' + type + '/' + id + '&server=' + server);
}