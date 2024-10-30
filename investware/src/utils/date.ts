import dayjs from 'dayjs';

export const formatDate = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export function DateToMilliSeconds(date: Date) {
  let epochTime = Math.floor(date.getTime() / 1000);
  return epochTime;
}

export function MilliSecondsToDate(date: number) {
  let _date = new Date(date * 1000);
  return _date;
}
