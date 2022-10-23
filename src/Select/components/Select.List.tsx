import { useEffect, Children, cloneElement } from 'react';
import { useSelectContext } from '../Select.context';

type SelectListProps = {
  children: React.ReactNode;
  className?: string;
};

export const SelectList = ({ children, className }: SelectListProps) => {
  const { state, send, listRef } = useSelectContext();

  useEffect(function sendListItemsToState() {
    if (!Array.isArray(children)) {
      return;
    }

    const options = children.map((childElement, index) => {
      if (childElement.type.name !== 'SelectOption') {
        throw new Error('Select.List must only contain Select.Option');
      }

      // todo extract the text from the nested children
      const { children, ...optionProps } = childElement.props;

      return { ...optionProps, index, label: children };
    });

    if (state.options?.length !== options.length) {
      send.setOptions(options);
    }
  });

  return (
    <div style={{ position: 'absolute' }}>
      <ul
        className={className}
        aria-activedescendant={state.selected?.index}
        aria-orientation="vertical"
        ref={listRef}
        hidden={!state.open}
        role="listbox"
        id="id-listbox"
      >
        {Children.map(children, (child, index) => {
          return cloneElement(child, { index });
        })}
      </ul>
    </div>
  );
};
