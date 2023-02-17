import axios from 'axios';
import apiConfig from '../config/api.config';

export async function movieSearch(value, page = 1, from = 'flixhq') {
    try {
        const response = await axios.get(apiConfig.based_url + 'movies/' + from + '/' + value + '?page=' + page);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function movieSearchInfo(type, id, from = 'flixhq') {
    try {
        const response = await axios.get(apiConfig.based_url + 'movies/' + from + '/info?id=' + type + '/' + id);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function movieStream(episodeId, type, id, from = 'flixhq', server = 'upcloud x') {
    try {
        let data = [];
        const response = await axios.get(apiConfig.based_url + 'movies/' + from + '/watch?episodeId=' + episodeId + '&mediaId=' + type + '/' + id + '&server=' + server);

        data['status'] = true;
        data['data'] = response.data;
        return data;
    } catch (error) {
        let data = [];
        data['status'] = false;
        data['error'] = error.response.data.message;
        return data;
    }
}