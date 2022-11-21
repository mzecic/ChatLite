import sendRequest from './send-request';
const BASE_URL = '/api/messages';

export function getMessages(inboxId) {
    return sendRequest(`${BASE_URL}/${inboxId}`);
}

export function createMessage(message) {
    return sendRequest(`${BASE_URL}`, 'POST', message)
}
