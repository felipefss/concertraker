// TODO: Use an actual more powerful logger
export const timedLog = (message: string, ...rest: string[]) => {
  const now = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  console.log(`[${dateTimeFormat.format(now)}]`, message, ...rest);
};
