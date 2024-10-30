import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const getDateThFormat = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY");
};

export const getDateSlashFormat = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};
