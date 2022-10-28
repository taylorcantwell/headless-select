import { SelectInput, SelectList, SelectOption, SelectPlaceholder } from './components';
import { SelectContextProvider } from './state/Select.context';

type SelectProps = {
  className?: string;
  children: React.ReactNode;
} 

type SelectComponents = {
  Input: typeof SelectInput;
  List: typeof SelectList;
  Option: typeof SelectOption;
  Placeholder: typeof SelectPlaceholder;
}

export const Select: React.FC<SelectProps> & SelectComponents  = ({ children, className } ) => {
  return (
    <div style={{ position: 'relative' }} className={className}>
      <SelectContextProvider>{children}</SelectContextProvider>
    </div>
  );
};

Select.Input = SelectInput;
Select.List = SelectList;
Select.Option = SelectOption;
Select.Placeholder = SelectPlaceholder;
