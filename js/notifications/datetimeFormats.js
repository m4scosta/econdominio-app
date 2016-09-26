// @flow
const DAY_MILLIS = 24 * 60 * 60 * 1000;
const TODAY = formatDate(Date.now());
const YESTERDAY = formatDate(Date.now() - DAY_MILLIS);


export function formatDate(unix: number): string {
  var date = new Date(unix);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  var dateStr = `${day}/${month}/${year}`;
  dateStr = dateStr === TODAY ? 'Hoje' : dateStr;
  dateStr = dateStr === YESTERDAY ? 'Ontem' : dateStr;
  return dateStr;
}


export function formatTime(unix: number): string {
  var date = new Date(unix);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
}
