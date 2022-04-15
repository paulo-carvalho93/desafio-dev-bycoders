export function parseTransactionHour(hourString: string) {
  const hour = hourString.slice(0, 2);
  const minute = hourString.slice(2, 4);
  const seconds = hourString.slice(4, 6);

  return `${hour}:${minute}:${seconds}`;
}
