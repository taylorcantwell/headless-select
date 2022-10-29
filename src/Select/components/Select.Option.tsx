import { useRef, useEffect } from 'react';
import { useSelectContext } from '../state/Select.context';

type SelectOptionProps = {
  children: React.ReactNode | Function;
  className?: string;
  value: string;
};

export const SelectOption = ({
  className,
  children,
  value,
}: SelectOptionProps) => {
  const { state, dispatch } = useSelectContext();
  const optionRef = useRef<HTMLLIElement>(null);

  const index = state.options.find((option) => option?.value === value)?.index; //using the value to grab the index, value then has to be unique *vomits*

  const isSelected = state.selectedIndex === index;
  const isTargeted = state.activeIndex === index;

  useEffect(
    function scrollIntoView() {
      if (state.activeIndex === index) {
        optionRef?.current?.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    },
    [state.activeIndex, index, optionRef]
  );

  const child =
    typeof children === 'function' ? children(isSelected) : children;

  return (
    <li
      ref={optionRef}
      aria-selected={isSelected}
      data-active={isTargeted}
      className={className}
      onClick={() => {
        dispatch.select(index!);
        dispatch.close();
      }}
      role="option"
    >
      {child}
    </li>
  );
};
