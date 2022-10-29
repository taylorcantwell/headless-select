import { useSelectContext } from '../state/Select.context';

type SelectInputProps = {
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  labelledBy?: string;
};

export const SelectInput = ({
  ariaLabel,
  children,
  className,
  name,
  labelledBy,
}: SelectInputProps) => {
  const { state, dispatch, triggerRef, onKeyDown } = useSelectContext();

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-controls="id-listbox"
      aria-expanded={state.open}
      className={className}
      ref={triggerRef}
      id="id-combobox"
      role="combobox"
      onKeyDown={onKeyDown}
      onMouseDown={dispatch.toggle}
      tabIndex={0}
    >
      <input
        name={name}
        value={state.selectedIndex && state.options[state.selectedIndex]?.value}
        hidden
      />
      {children}
    </div>
  );
};
