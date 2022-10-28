import { useSelectContext } from '../state/Select.context';

type SelectPlaceholderProps = {
  placeholder?: string;
};

export const SelectPlaceholder = ({ placeholder }: SelectPlaceholderProps) => {
  const { state } = useSelectContext();
  const selectedOptionLabel = state.selectedIndex && state.options[state.selectedIndex]?.label;

  return (
    <>
      {selectedOptionLabel ?? placeholder}
    </>
  );
};
