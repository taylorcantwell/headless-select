import { Select } from '../Select';
import { Option } from './components';

type CustomSelectTwoProps = {
  options: {
    label: string;
    value: string;
  }[];
};

export const CustomSelectTwo = ({ options }: CustomSelectTwoProps) => {
  return (
    <Select className="w-64">
      <Select.Input
        className="hover:border-orange-400 w-full outline-none focus:border-orange-400  border px-2 py-1 rounded-xl  items-center flex gap-2 justify-center text-orange-600 "
        placeholder="Options..."
      />

      <Select.List className="border border-orange-200 w-full mt-4 rounded-xl">
        {options.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select.List>
    </Select>
  );
};
