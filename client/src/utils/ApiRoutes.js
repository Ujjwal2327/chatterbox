export const HOST = "https://chatterbox-7n4n.onrender.com";
// export const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/auth`;
const USER_ROUTE = `${HOST}/api/user`;
const MESSAGES_ROUTE = `${HOST}/api/messages`;
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS_ROUTE = `${USER_ROUTE}/get-contacts`;
export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`;
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-image-message`;
export const ADD_AUDIO_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-audio-message`;
export const GET_INITIAL_CONTACTS_ROUTE = `${MESSAGES_ROUTE}/get-initial-contacts`;
export const TRANSLATE_TEXT_ROUTE = `${HOST}/api/translate`;
export const SCHEDULE_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/schedule-message`;
export const DELETE_MSG_ROUTE = `${MESSAGES_ROUTE}/delete`;
export const CHANGE_CURRENT_CHAT_USER = `${USER_ROUTE}/change-currentchatuser`;
