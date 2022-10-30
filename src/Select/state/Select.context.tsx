import { useReducer, createContext, useContext, useRef } from 'react';
import { Keys } from '../utils';
import { type SelectState, selectReducer, Dispatcher } from './Select.reducer';
import { useClickOutside } from '../hooks';

type SelectContextValue = {
  state: SelectState;
  dispatch: Dispatcher;
  triggerRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLUListElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
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
    activeIndex: -1,
  });

  const dispatch = new Dispatcher(_dispatch);

  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useClickOutside([triggerRef, listRef], () => {
    if (state.open) {
      dispatch.close();
    }
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const invalidKey = !Object.keys(Keys).some((code) =>
      event.code.startsWith(code)
    );

    if (invalidKey) return;

    dispatch.open();

    switch (event.code) {
      case Keys.ArrowDown:
        if (state.activeIndex < state.options.length - 1) {
          dispatch.targetDown();
        }
        break;

      case Keys.ArrowUp:
        if (state.activeIndex > 0) {
          dispatch.targetUp();
        }
        break;

      case Keys.Enter:
        if (state.activeIndex >= 0 && state.open) {
          dispatch.select(state.activeIndex);
          dispatch.close();
          return;
        }
        break;

      case Keys.Escape:
        dispatch.close();
        break;

      case Keys.Tab:
        dispatch.close();
        break;

      // --- Catch all Char keys for search functionality

      default:
        const indexesOfMatches = state.options
          .filter((option) =>
            option.label.toLowerCase().startsWith(event.key.toLowerCase())
          )
          .map((match) => state.options.indexOf(match));

        if (indexesOfMatches.length === 0) return;

        // --- Set the first match as the active option, if no matched options are currently active

        const noMatchedOptionsAreActive = !indexesOfMatches.includes(
          state.activeIndex
        );

        if (noMatchedOptionsAreActive) {
          const firstIndexOfMatch = indexesOfMatches[0];
          dispatch.setActive(firstIndexOfMatch);
        }

        // --- Set the next match as the active option, if a matched option is currently active

        const matchedOptionsAreActive = !noMatchedOptionsAreActive;
        const isActiveIndexLessThanLastMatchIndex =
          state.activeIndex < indexesOfMatches[indexesOfMatches.length - 1];

        if (matchedOptionsAreActive && isActiveIndexLessThanLastMatchIndex) {
          const indexOfNextMatch =
            indexesOfMatches[indexesOfMatches.indexOf(state.activeIndex) + 1];

          dispatch.setActive(indexOfNextMatch);
        }

        // --- Set the first match as the active option, if the last matched option is currently active

        const isActiveIndexLastMatchIndex =
          state.activeIndex === indexesOfMatches[indexesOfMatches.length - 1];

        if (isActiveIndexLastMatchIndex) {
          const firstMatch = indexesOfMatches[0];
          dispatch.setActive(firstMatch);
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
