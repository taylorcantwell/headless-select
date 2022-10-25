import { Select } from '../../Select';

export const Option = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <Select.Option
      className=" data-[active=true]:bg-orange-200 w-full flex px-2 py-1 items-center justify-between gap-2 first:rounded-t-xl last:rounded-b-xl"
      value={value}
    >
      {(active: boolean) => {
        return (
          <div
            className={`flex justify-between items-center w-full ${
              active && 'flex-row-reverse'
            }`}
          >
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
          </div>
        );
      }}
    </Select.Option>
  );
};
