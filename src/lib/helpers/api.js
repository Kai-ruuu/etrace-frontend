import { PUBLIC_API_BASE_URL } from '$env/static/public';

export function apiPath(path) {
    return PUBLIC_API_BASE_URL + path
}