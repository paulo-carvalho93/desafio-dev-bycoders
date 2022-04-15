import { format } from 'date-fns';

export function parseTransactionDate(date: string) {
  const year = +date.substring(0, 4);
  const month = +date.substring(4, 6);
  const day = +date.substring(6, 8);

  const newDate = new Date(year, month - 1, day);
  const formattedDate = format(newDate, 'yyyy-MM-dd');
  return formattedDate;
}
