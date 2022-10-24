import { Select } from './Select';

function App() {
  return (
    <div className="w-[480px] mx-auto pt-20">
      <Select className="w-full">
        <Select.Input
          placeholder="Search..."
          className="hover:border-gray-400 outline-none focus:border-gray-400  border px-2 py-1 rounded-sm w-full items-center flex gap-2"
        >
          <MagnifyingGlass />
        </Select.Input>

        <Select.List className="border border-gray-200 w-full mt-2 rounded-sm">
          {options.map(({ label, value }) => (
            <CustomOption key={value} value={value}>
              {label}
            </CustomOption>
          ))}
        </Select.List>
      </Select>
    </div>
  );
}

export default App;

const MagnifyingGlass = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const CustomOption = ({
  value,
  children,
  index,
}: {
  value: string;
  children: React.ReactNode;
  index?: number;
}) => {
  return (
    <Select.Option
      index={index} // Todo not have to pass index
      className=" data-[active=true]:bg-gray-200 w-full flex px-2 py-1 items-center justify-between gap-2"
      value={value}
    >
      {(active: boolean) => {
        return (
          <>
            {children}
            {active && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </>
        );
      }}
    </Select.Option>
  );
};

const options = [
  { label: 'Tupac', value: '1' },
  { label: 'Biggie', value: '2' },
  { label: 'Nas', value: '3' },
  { label: 'Jay-Z', value: '4' },
];
