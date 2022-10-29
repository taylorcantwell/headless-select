import {
  SelectInput,
  SelectList,
  SelectOption,
  SelectPlaceholder,
} from './components';
import { SelectContextProvider } from './state/Select.context';
import { clsx } from 'clsx';

type SelectProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectComponents = {
  Input: typeof SelectInput;
  List: typeof SelectList;
  Option: typeof SelectOption;
  Placeholder: typeof SelectPlaceholder;
};

export const Select: React.FC<SelectProps> & SelectComponents = ({
  children,
  className,
}) => {
  return (
    <div className={clsx([className, 'relative'])}>
      <SelectContextProvider>{children}</SelectContextProvider>
    </div>
  );
};

Select.Input = SelectInput;
Select.List = SelectList;
Select.Option = SelectOption;
Select.Placeholder = SelectPlaceholder;
