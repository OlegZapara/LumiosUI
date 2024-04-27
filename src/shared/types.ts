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
