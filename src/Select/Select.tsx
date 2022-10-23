import { SelectInput, SelectList, SelectOption } from './components';
import { SelectContextProvider } from './Select.context';

type SelectProps = {
  children: React.ReactNode;
};

export const Select = ({ children }: SelectProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <SelectContextProvider>{children}</SelectContextProvider>
    </div>
  );
};

Select.Input = SelectInput;
Select.List = SelectList;
Select.Option = SelectOption;
