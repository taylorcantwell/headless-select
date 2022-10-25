import React, {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
} from 'react';
import { useSelectContext } from '../state/Select.context';

type SelectListProps = {
  children: React.ReactNode;
  className?: string;
};

export const SelectList = ({ children, className }: SelectListProps) => {
  const { state, dispatch, listRef } = useSelectContext();

  useLayoutEffect(function sendListItemsToState() {
    // Check if children are valid
    if (!Array.isArray(children)) {
      throw new Error('Select.List must have children');
    }

    const childrenArray = Children.toArray(children);

    const validChildren = childrenArray.every((child) => isValidElement(child));

    if (!validChildren) {
      throw new Error('Select.List children must be valid react elements');
    }

    // --

    const options = childrenArray.map((childElement, index) => {
      const { children, ...optionProps } = (childElement as React.ReactElement)
        .props;

      if (!optionProps.value || !children) {
        throw new Error(
          'The direct children of SelectList must be a component that takes a value prop and has a label as its children'
        );
      }

      return { ...optionProps, index, label: children };
    });

    if (JSON.stringify(state.options) !== JSON.stringify(options)) {
      dispatch.setOptions(options);
    }
  });

  return (
    <ul
      style={{ position: 'absolute' }}
      className={className}
      aria-activedescendant={
        state.selected ? String(state.selected) : undefined
      }
      aria-orientation="vertical"
      ref={listRef}
      hidden={!state.open}
      role="listbox"
      id="id-listbox"
    >
      {children}
    </ul>
  );
};
