import { Select } from '../../Select';
import { useSelectContext } from '../../Select/state/Select.context';

export const Option = ({
  value,
  children,
  index,
}: {
  value: string;
  children: React.ReactNode;
  index: number;
}) => {
  const { state } = useSelectContext();
  const isSelected = state.selectedIndex === index;

  return (
    <Select.Option
      className="data-[active=true]:bg-orange-200 flex items-center justify-between w-full gap-2 px-2 py-1 first:rounded-t-xl last:rounded-b-xl"
      value={value}
    >
      <div
        className={`flex justify-between items-center w-full ${
          isSelected && 'flex-row-reverse'
        }`}
      >
        {children}
        {isSelected && (
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
    </Select.Option>
  );
};
