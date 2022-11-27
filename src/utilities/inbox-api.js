import sendRequest from './send-request';
const BASE_URL = '/api/inbox';

export async function getInboxes(userId) {
    return sendRequest(`${BASE_URL}/${userId}`)
}

export async function getSecondUser(secondUserId) {
    return sendRequest(`${BASE_URL}/users/${secondUserId}`);
}

export async function createInbox(userId, secondUserId) {
    return sendRequest(`${BASE_URL}`, 'POST', [userId, secondUserId]);
}

export async function removeInbox(removedInbox) {
    return sendRequest(`${BASE_URL}/${removedInbox[0]._id}`, 'DELETE', removedInbox);
}
