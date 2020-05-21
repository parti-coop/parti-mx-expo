import { differenceInDays, addDays, format, isAfter } from "date-fns";
import { ko } from "date-fns/locale";
export function calculateDays(date: string) {
  // const time = (_ => _.setDate(_.getDate() + 30))(new Date(date));
  // const timeDiff = new Date().getTime() - time;
  // const daysDiff = timeDiff / 1000 / 60 / 60 / 24;
  // const daysDiffCeil = Math.ceil(daysDiff);
  // return daysDiffCeil;
  return differenceInDays(new Date(), addDays(new Date(date), 30));
}
export function minutesDiff(date: string) {
  const time = new Date(date).getTime();
  const timeDiff = new Date().getTime() - time;
  const minDiff = timeDiff / 60 / 1000;
  return minDiff;
}
export function closingDateFrom(created_at: string, days = 30) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(new Date(created_at), days), "yyyy.MM.dd");
  } catch (error) {
    return error.message;
  }
}
export function closingMonthDateFrom(created_at: string, days = 30) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(new Date(created_at), days), "MM/dd");
  } catch (error) {
    return error.message;
  }
}

export function formatDateFromString(date: string) {
  try {
    return format(new Date(date), "yyyy.MM.dd HH:mm");
  } catch (error) {
    return error.message;
  }
}
export function isAfterString(date1: string, date2: string) {
  if (date1 === null) {
    return false;
  }
  if (date2 === undefined) {
    return true;
  }
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return isAfter(d1, d2);
  } catch (error) {
    return false;
  }
}
