import sendRequest from './send-request';
const BASE_URL = '/api/inbox';

export async function getInboxes(userId) {
    return sendRequest(`${BASE_URL}/${userId}`)
}

export async function getSecondUser(secondUserId) {
    return sendRequest(`${BASE_URL}/users/${secondUserId}`);
}
