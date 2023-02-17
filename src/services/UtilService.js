import apiConfig from "../config/api.config";
import Store from "../store/store";

export function setCookie(key, data) {
    Store.set(key, data, apiConfig.exdays);
    return key;
}

export function removeCookie(key) {
    Store.remove(key, null);
}

export function getCookie(key) {
    return Store.get(key);
}