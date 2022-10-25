import { useSelectContext } from '../state/Select.context';

type SelectInputProps = {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  name?: string;
};

export const SelectInput = ({
  children,
  placeholder,
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
      value={state.selected && state.options[state.selected]?.value}
      className={className}
      ref={triggerRef}
      id="id-combobox"
      role="combobox"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseDown={() => {
        dispatch.toggle();
      }}
    >
      {children}
      {(state.selected && state.options[state.selected]?.label) || placeholder}
    </button>
  );
};
