import { PUBLIC_API_BASE_URL } from '$env/static/public';

export function apiPath(path) {
    return PUBLIC_API_BASE_URL + path
}

export function getRequirementPath(requirementName, filename) {
    return PUBLIC_API_BASE_URL + `/requirements/${requirementName}/${filename}`;
}
