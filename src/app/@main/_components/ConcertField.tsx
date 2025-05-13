interface Props {
  label: string;
  value: string;
}

export const ConcertField = ({ label, value }: Props) => {
  return (
    <div>
      <label className='font-bold dark:text-white'>{label}</label>
      <p className='text-gray-500 dark:text-gray-400'>{value}</p>
    </div>
  );
};
