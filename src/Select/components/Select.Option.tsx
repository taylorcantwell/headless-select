import { useSelectContext } from '../Select.context';

type SelectOptionProps = {
  children: React.ReactNode;
  index?: number;
  className?: string;
  value: string;
};

export const SelectOption = ({
  className,
  children,
  index,
}: SelectOptionProps) => {
  const { state, send } = useSelectContext();

  return (
    <li
      aria-selected={state.selected === index}
      data-selected={state.selected === index}
      data-targeted={state.targetedIndex === index}
      className={className}
      onClick={() => {
        send.select(index);
        send.close();
      }}
      role="option"
      id={String(index)}
    >
      {children}
    </li>
  );
};
