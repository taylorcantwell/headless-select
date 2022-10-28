import { Select } from '../Select';
import { ArrowIcon, Option } from './components';

type CustomSelectTwoProps = {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
};

export const CustomSelectTwo = ({
  options,
  placeholder,
}: CustomSelectTwoProps) => {
  return (
    <Select className="w-64 text-orange-600">
      <Select.Input className="flex items-center justify-center w-full gap-2 px-2 py-1 border border-orange-200 outline-none hover:border-orange-400 focus:border-orange-400 rounded-xl">
        <ArrowIcon />
        <Select.Placeholder placeholder={placeholder} />
      </Select.Input>

      <Select.List className="w-full mt-4 border border-orange-200 rounded-xl">
        {options.map(({ label, value }, index) => (
          <Option key={value} value={value} index={index}>
            {label}
          </Option>
        ))}
      </Select.List>
    </Select>
  );
};
