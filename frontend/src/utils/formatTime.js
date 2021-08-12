import {
  format,
  isToday,
  isThisWeek,
  isThisMonth,
  parseISO,
  formatDistanceToNow,
} from "date-fns";

export const getMessageTime = (date) => {
  const parsedTime = parseISO(date);

  if (isToday(parsedTime)) {
    return format(parsedTime, "hh:mm");
  } else if (isThisWeek(parsedTime)) {
    return format(parsedTime, "hh:mm E");
  } else if (isThisMonth(parsedTime)) {
    return format(parsedTime, "hh:mm dd/MM");
  } else {
    return format(parsedTime, "hh:mm dd/MM/yy");
  }
};

export const getDialogTime = (time) => {
  return formatDistanceToNow(parseISO(time), { addSuffix: true });
};
