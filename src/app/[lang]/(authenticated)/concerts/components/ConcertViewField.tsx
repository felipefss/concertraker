interface Props {
  label: string;
  value: string | number;
}

export function ConcertViewField({ label, value }: Props) {
  return (
    <div>
      <span className="font-bold dark:text-white">{label}</span>
      <p className="text-gray-500 dark:text-gray-400">{value}</p>
    </div>
  );
}
