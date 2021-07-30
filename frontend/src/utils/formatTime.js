import { format, isToday, parseISO, formatDistanceToNow } from "date-fns";

export const getMessageTime = (createdAt) => {
  if (isToday(parseISO(createdAt))) {
    return format(parseISO(createdAt), "hh:mm");
  } else {
    return format(parseISO(createdAt), "dd.MM.yyyy");
  }
};

export const getDialogTime = (createdAt) => {
  return formatDistanceToNow(parseISO(createdAt), { addSuffix: true });
};
