import { Select } from '../Select';
import { Option, MagnifyingGlass } from './components';

type CustomSelectOneProps = {
  options: {
    label: string;
    value: string;
  }[];
};

export const CustomSelectOne = ({ options }: CustomSelectOneProps) => {
  return (
    <Select>
      <Select.Input className="flex items-center w-full gap-2 px-2 py-1 border rounded-sm outline-none hover:border-gray-400 focus:border-gray-400">
        <Select.Placeholder placeholder="Select..." />
        <MagnifyingGlass />
      </Select.Input>

      <Select.List className="w-full mt-2 overflow-y-scroll border border-gray-200 rounded-sm max-h-40 ">
        {options.map(({ label, value }) => (
          <Option key={value} value={value}>
            {/*  If the child is wrapped at this level, it explodes because select.list expects an array. */}

            {label}
          </Option>
        ))}
      </Select.List>
    </Select>
  );
};
