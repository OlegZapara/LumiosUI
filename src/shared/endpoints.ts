export const API_BASE = "https://api.uaproject-reborn.xyz";

export const GET_TIMETABLE = API_BASE + "/timetables/retrieve";
export const UPDATE_TIMETABLE = API_BASE + "/timetables/update";
export const CREATE_TIMETABLE = API_BASE + "/timetables/create";

export const GET_TASKS = API_BASE + "/tasks";
export const GET_TASK = (id: string) => `${API_BASE}/tasks/${id}`;
export const UPDATE_TASK = API_BASE + "/tasks";
export const CREATE_TASK = API_BASE + "/tasks";
export const DELETE_TASK = (id: string) => `${API_BASE}/tasks/${id}`;

export const GET_SHOTS = API_BASE + "/statistics/shots";
// export const GET_MESSAGES = API_BASE + "/statistics/messages";

export const GET_QUEUES = API_BASE + "/queues";
export const GET_QUEUE = (id: string) => `${API_BASE}/queues/${id}`;
export const UPDATE_QUEUE = API_BASE + "/queues";
export const CREATE_QUEUE = API_BASE + "/queues";
export const DELETE_SIMPLE_QUEUE = (id: string) =>
  `${API_BASE}/queues/simple/${id}`;
export const DELETE_MIXED_QUEUE = (id: string) =>
  `${API_BASE}/queues/mixed/${id}`;

export const GET_USER = (userId: string) => `${API_BASE}/auth/user/${userId}`;
export const UPDATE_USER_CHAT_ID = (userId: string) =>
  `${API_BASE}/auth/bind/${userId}`;
export const GET_USER_CHAT_ID = (userId: string) =>
  `${API_BASE}/auth/unbind/${userId}`;

export const GET_RATING = (chatId: string, date: string) =>
  `${API_BASE}/records/rating?chatId=${chatId}&date=${date}`;

export const GET_MESSAGES = (chatId: string, date1: string, date2: string) =>
  `${API_BASE}/records/messages?chatId=${chatId}&startDate=${date1}&endDate=${date2}`;
