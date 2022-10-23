import { useSelectContext } from '../Select.context';

type SelectInputProps = {
  className?: string;
  placeholder: string;
  name?: string;
};

export const SelectInput = ({
  placeholder,
  className,
  name,
}: SelectInputProps) => {
  const { state, send, triggerRef, onKeyDown } = useSelectContext();

  return (
    <button
      aria-controls="id-listbox"
      aria-expanded={state.open}
      aria-haspopup="listbox"
      data-list-open={state.open}
      name={name}
      value={state.options[state.selected?.index]?.value}
      className={className}
      ref={triggerRef}
      id="id-combobox"
      role="combobox"
      onKeyDown={onKeyDown}
      onMouseDown={() => {
        send.toggle();
      }}
    >
      {state.options[state.selected]?.label || placeholder}
    </button>
  );
};
