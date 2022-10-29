import { useSelectContext } from '../state/Select.context';

type SelectPlaceholderProps = {
  placeholder?: string;
};

export const SelectPlaceholder = ({ placeholder }: SelectPlaceholderProps) => {
  const { state } = useSelectContext();
  const selectedOptionLabel =
    typeof state.selectedIndex === "number"
      ? state.options[state.selectedIndex]?.label
      : null;

  return <>{selectedOptionLabel ?? placeholder}</>;
};
