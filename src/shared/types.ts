export type Timetable = {
  weekType: string;
  days: TimetableDay[];
};

export type TimetableDay = {
  dayName: string;
  classEntries: TimetableEntry[];
};

export type TimetableEntry = {
  className: string;
  startTime: string;
  endTime: string;
  classType: string;
  url: string;
};

export type Task = {
  id: string;
  taskName: string;
  dueDate: Date;
  dueTime: string;
  url: string;
};

export type User = {
  username: string;
  name: string;
  accountId: number;
};

export type Queue = {
  alias: string;
  id: string;
  messageId: string;
  pinned?: boolean;
  isMixed: boolean;
  contents: User[];
};

export type TelegramChat = {
  id: number;
  admin: boolean;
  name: string;
  description: string;
};

export type TelegramUser = {
  username: string;
  accountId: string;
  chats: TelegramChat[];
};
