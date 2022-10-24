import { useEffect, Children, cloneElement } from 'react';
import { useSelectContext } from '../state/Select.context';

type SelectListProps = {
  children: React.ReactNode;
  className?: string;
};

export const SelectList = ({ children, className }: SelectListProps) => {
  const { state, dispatch, listRef } = useSelectContext();

  useEffect(function sendListItemsToState() {
    if (!Array.isArray(children)) {
      return; // todo
    }

    const options = children.map((childElement, index) => {
      // if (childElement.type.name !== 'SelectOption') {
      //   throw new Error('Select.List must only contain Select.Option');
      // }

      // todo extract the text from the nested children
      const { children, ...optionProps } = childElement.props;

      return { ...optionProps, index, label: children };
    });

    if (state.options?.length !== options.length) {
      dispatch.setOptions(options);
    }
  });

  return (
    <ul
      style={{ position: 'absolute' }}
      className={className}
      aria-activedescendant={state.selected}
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
  );
};
