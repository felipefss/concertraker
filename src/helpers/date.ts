import { format } from 'date-fns';

const dateFormats = {
  full: 'yyyy-MM-dd HH:mm:ss',
  shortFull: 'yyyy-MM-dd',
  shortYear: 'yyyy',
  shortYearMonth: 'yyyy-MM',
  shortYearShortMonth: 'MMM yyyy',
};

type DateFormat = keyof typeof dateFormats;

export function formatDate(
  date: Date | string,
  formatInput: DateFormat = 'shortFull',
) {
  return format(date, dateFormats[formatInput]);
}
