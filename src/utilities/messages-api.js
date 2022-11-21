import sendRequest from './send-request';
const BASE_URL = '/api/messages';

export function getMessages(inboxId) {
    return sendRequest(`${BASE_URL}/${inboxId}`);
}
