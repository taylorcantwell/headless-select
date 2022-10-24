import { cloneElement, Children } from 'react';
import { useSelectContext } from '../state/Select.context';

type SelectOptionProps = {
  children: React.ReactNode | Function;
  index?: number;
  className?: string;
  value: string;
};

export const SelectOption = ({
  className,
  children,
  index,
}: SelectOptionProps) => {
  const { state, dispatch } = useSelectContext();

  const child =
    typeof children === 'function'
      ? children(state.selected === index)
      : children;

  return (
    <li
      aria-selected={state.selected === index}
      data-active={state.targetedIndex === index}
      data-targeted={state.targetedIndex === index}
      className={className}
      onClick={() => {
        dispatch.select(index!);
        dispatch.close();
      }}
      role="option"
      id={String(index)}
    >
      {child}
    </li>
  );
};
