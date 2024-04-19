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
export const GET_MESSAGES = API_BASE + "/statistics/messages";

export const GET_QUEUES = API_BASE + "/queues/retrieve";
export const UPDATE_QUEUE = API_BASE + "/queues/update";
export const CREATE_QUEUE = API_BASE + "/queues/create";
