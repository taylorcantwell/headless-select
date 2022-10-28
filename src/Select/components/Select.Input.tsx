import { useSelectContext } from '../state/Select.context';

type SelectInputProps = {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  name?: string;
};

export const SelectInput = ({
  children,
  className,
  name,
}: SelectInputProps) => {
  const { state, dispatch, triggerRef, onKeyDown } = useSelectContext();

  return (
    <button
      aria-controls="id-listbox"
      aria-expanded={state.open}
      aria-haspopup="listbox"
      data-list-open={state.open}
      name={name}
      value={state.selectedIndex && state.options[state.selectedIndex]?.value}
      className={className}
      ref={triggerRef}
      id="id-combobox"
      role="combobox"
      onKeyDown={onKeyDown}
      onMouseDown={dispatch.toggle}
    >
      {children}
    </button>
  );
};
