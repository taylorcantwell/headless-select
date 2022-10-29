import { CustomSelectOne } from './CustomSelectOne';
import { CustomSelectTwo } from './CustomSelectTwo';

export default function App() {
  return (
    <div className="w-[480px] mx-auto pt-20 flex flex-col gap-48">
      <CustomSelectTwo options={options} />
      <CustomSelectOne options={options} />
    </div>
  );
}

const options = [
  { label: 'Apples', value: '1' },
  { label: 'Oranges', value: '2' },
  { label: 'Bananas', value: '3' },
  { label: 'Oranjs', value: '4' },
  { label: 'Banans', value: '5' },
  { label: 'Orans', value: '6' },
  { label: 'Banas', value: '7' },
  { label: 'Oras', value: '8' },
  { label: 'Bans', value: '9' },
  { label: 'Ora', value: '10' },
  { label: 'Bas', value: '11' },
];
