import { cloneElement, Children, useRef, useEffect } from 'react';
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
  const optionRef = useRef(null);

  const index = state.options.find((option) => option?.value === value)?.index; //using the value to grab the index, value then has to be unique *vomits*

  const child =
    typeof children === 'function'
      ? children(state.selected === index)
      : children;

  useEffect(
    function scrollIntoView() {
      if (state.targetedIndex === index) {
        optionRef?.current?.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    },
    [state.targetedIndex, index]
  );

  return (
    <li
      ref={optionRef}
      aria-selected={state.selected === index}
      data-active={state.targetedIndex === index}
      data-targeted={state.targetedIndex === index}
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
