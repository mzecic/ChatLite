import sendRequest from './send-request';
const BASE_URL = '/api/messages';

export function getMessages(inboxId) {
    return sendRequest(`${BASE_URL}/${inboxId}`);
}

export function createMessage(message, inbox) {
    return sendRequest(`${BASE_URL}/${inbox._id}`, 'POST', message)
}

export function getAllMessages() {
    return sendRequest(`${BASE_URL}`);
}
