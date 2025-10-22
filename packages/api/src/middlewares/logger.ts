// TODO: Use an actual more powerful logger
export const timedLog = (message: string, ...rest: string[]) => {
  const now = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    year: 'numeric',
  });
  console.log(`[${dateTimeFormat.format(now)}]`, message, ...rest);
};
