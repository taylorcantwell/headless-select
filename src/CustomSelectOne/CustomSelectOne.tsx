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
      <Select.Input
        placeholder="Search..."
        className="hover:border-gray-400 outline-none focus:border-gray-400  border px-2 py-1 rounded-sm w-full items-center flex gap-2"
      >
        <MagnifyingGlass />
      </Select.Input>

      <Select.List className="border border-gray-200 w-full mt-2 rounded-sm max-h-40 overflow-y-scroll ">
        {options.map(({ label, value }) => (
          <Option key={value} value={value}>
            {/*  If the child wrapped at this level, it explodes because select.list expects an array. */}

            {label}
          </Option>
        ))}
      </Select.List>
    </Select>
  );
};
