/** Weekly gatherings. Used on Home, Plan a Visit and the events calendar. */
export interface ServiceTime {
  day: string;
  /** Short name shown on the calendar. */
  name: string;
  detail: string;
  /** 0 = Sunday … 6 = Saturday. Used to show these on the calendar. */
  weekday: number;
  time: string;
}

export const serviceTimes: ServiceTime[] = [
  { day: "Sunday Worship", name: "Sunday Worship", detail: "8:00am • 10:00am • 12:00pm", weekday: 0, time: "8:00am" },
  { day: "Wednesday", name: "Bible Study", detail: "Midweek Bible Study • 6:30pm", weekday: 3, time: "6:30pm" },
  { day: "Friday", name: "Prayer Night", detail: "Prayer Night • 6:30pm", weekday: 5, time: "6:30pm" },
  { day: "Saturday", name: "Youth Gathering", detail: "Youth Gathering • 6:00pm", weekday: 6, time: "6:00pm" },
];
