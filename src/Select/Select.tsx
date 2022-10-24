import { SelectInput, SelectList, SelectOption } from './components';
import { SelectContextProvider } from './state/Select.context';

type SelectProps = {
  className?: string;
  children: React.ReactNode;
};

export const Select = ({ children, className }: SelectProps) => {
  return (
    <div style={{ position: 'relative' }} className={className}>
      <SelectContextProvider>{children}</SelectContextProvider>
    </div>
  );
};

Select.Input = SelectInput;
Select.List = SelectList;
Select.Option = SelectOption;
