import moment from 'moment';

export function calculateTimeLeft(start_time: number, end_time: number) {
  if (start_time && end_time) {
    const start_time_unix = moment.unix(start_time);
    const end_time_unix = moment.unix(end_time);

    const result = moment.duration(end_time_unix.diff(start_time_unix));
    if (result.asMinutes() >= 60) {
      const hours = result.hours();
      const minutes = result.minutes();

      if (minutes < 1) return `${hours.toFixed(0)} ${Number(hours.toFixed(0)) > 1 ? 'hr' : 'hrs'}`;
      else return `${hours.toFixed(0)} ${Number(hours.toFixed(0)) > 1 ? 'hrs' : 'hr'} ${minutes} min`;
    }
    return result.asMinutes() < 1 ? '' : `${result.asMinutes()} min`;
  }
  return '';
}
