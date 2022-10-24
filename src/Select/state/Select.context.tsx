import { useReducer, createContext, useContext, useRef } from 'react';
import { Keys } from '../../utils';
import { type SelectState, selectReducer, Dispatcher } from './Select.reducer';
import { useClickOutside } from '../../hooks';

type SelectContextValue = {
  state: SelectState;
  dispatch: Dispatcher;
  triggerRef: any;
  listRef: any;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

type SelectContextProviderProps = {
  children: React.ReactNode;
};

export const SelectContextProvider = ({
  children,
}: SelectContextProviderProps) => {
  const [state, _dispatch] = useReducer(selectReducer, {
    options: [],
    open: false,
    targetedIndex: -1,
  });
  console.log('🚀 ~ file: Select.context.tsx ~ line 28 ~ state', state);

  const dispatch = new Dispatcher(_dispatch);

  const triggerRef = useRef();
  const listRef = useRef();

  useClickOutside([triggerRef, listRef], () => {
    if (state.open) {
      dispatch.close();
    }
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const invalidKey = Boolean(
      Object.keys(Keys).some((code) => event.code.startsWith(code))
    );

    if (invalidKey) return;

    dispatch.open();

    switch (event.code) {
      case Keys.ArrowDown:
        if (state.targetedIndex < state.options.length - 1) {
          dispatch.targetDown();
        }
        break;

      case Keys.ArrowUp:
        if (state.targetedIndex > 0) {
          dispatch.targetUp();
        }
        break;

      case Keys.Enter:
        if (state.targetedIndex >= 0 && state.open) {
          dispatch.select(state.targetedIndex);

          dispatch.close();

          return;
        }
        break;

      case Keys.Escape:
        dispatch.close();
        break;

      default: // Catch all Char keys for search functionality
        const indexesOfMatches = state.options
          .filter((option) =>
            option.label.toLowerCase().startsWith(event.key.toLowerCase())
          )
          .map((match) => state.options.indexOf(match));

        if (indexesOfMatches.length > 0) return;

        const matchedOptionsIsNotTargeted = !indexesOfMatches.includes(
          state.targetedIndex
        );

        if (matchedOptionsIsNotTargeted) {
          const firstIndexOfMatch = indexesOfMatches[0];
          dispatch.select(firstIndexOfMatch);
        }

        // ---

        const matchedOptionsIsTargeted = !matchedOptionsIsNotTargeted;
        const isTargetedIndexLessThanLastMatchIndex =
          state.targetedIndex < indexesOfMatches[indexesOfMatches.length - 1];

        if (matchedOptionsIsTargeted && isTargetedIndexLessThanLastMatchIndex) {
          const indexOfNextMatch =
            indexesOfMatches[indexesOfMatches.indexOf(state.targetedIndex) + 1];

          dispatch.select(indexOfNextMatch);
        }

        // ---

        const isTargetedIndexLastMatchIndex =
          state.targetedIndex === indexesOfMatches[indexesOfMatches.length - 1];

        if (isTargetedIndexLastMatchIndex) {
          const firstMatch = indexesOfMatches[0];
          dispatch.select(firstMatch);
        }
    }
  };

  return (
    <SelectContext.Provider
      value={{
        state,
        dispatch,
        triggerRef,
        listRef,
        onKeyDown,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'useSelectContext must be used within a SelectContextProvider'
    );
  }
  return context;
};
