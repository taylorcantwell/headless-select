import {
  useReducer,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react';

const SelectContext = createContext<SelectState | null>(null);

type SelectContextProviderProps = {
  children: React.ReactNode;
};

export const SelectContextProvider = ({
  children,
}: SelectContextProviderProps) => {
  const [state, dispatch] = useReducer(selectReducer, {
    options: [],
    open: false,
    targetedIndex: -1,
  });

  const triggerRef = useRef();
  const listRef = useRef();

  useClickOutside([triggerRef, listRef], () => {
    if (state.open) {
      send.close();
    }
  });

  const send = new Dispatcher(dispatch);

  const onKeyDown = (e: any) => {
    // Guard against key presses that don't have a corresponding action
    if (Object.entries(Keys).some((code) => e.code.startsWith(code))) return;
    send.open();

    switch (e.code) {
      case Keys.ArrowDown:
        if (state.targetedIndex < state.options.length - 1) {
          send.targetDown();
        }
        break;
      case Keys.ArrowUp:
        if (state.targetedIndex > 0) {
          send.targetUp();
        }
        break;
      case Keys.Enter:
        if (state.targetedIndex >= 0 && state.open) {
          send.select(state.targetedIndex);

          send.close();

          return;
        }
        break;
      case Keys.Escape:
        send.close();
        break;

      // Catch all Char keys for search functionality
      default:
        const indexesOfMatches = state.options
          .filter((option) =>
            option.label.toLowerCase().startsWith(e.key.toLowerCase())
          )
          .map((match) => state.options.indexOf(match));

        if (indexesOfMatches.length > 0) {
          // If the current selected index doesn't match any matched indexes, set to the first matched index
          if (!indexesOfMatches.includes(state.targetedIndex)) {
            send.select(indexesOfMatches[0]);
          }

          // Get the index of the last match
          const lastIndexOfMatchedOptions =
            indexesOfMatches[indexesOfMatches.length - 1];

          // If already on one of the matched indexes AND not the lasted matched index, set target and selected to the next match index
          if (
            indexesOfMatches.includes(state.targetedIndex) &&
            state.targetedIndex < lastIndexOfMatchedOptions
          ) {
            // Get next match index
            const nextMatch =
              indexesOfMatches[
                indexesOfMatches.indexOf(state.targetedIndex) + 1
              ];

            send.select(nextMatch);
          }

          // If already on the last matched index, set target and selected to the first matched index
          if (state.targetedIndex === lastIndexOfMatchedOptions) {
            send.select(indexesOfMatches[0]);
          }
        }
    }
  };

  const contextValue = {
    state,
    dispatch,
    send,
    onKeyDown,
    triggerRef,
    listRef,
  };
  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

type SelectState = {
  options: {
    index: number;
    label: string;
    value: string;
  }[];
  open: boolean;
  selected?: number;
  targetedIndex: number;
};

type SelectAction =
  | { type: 'OPEN' }
  | {
      type: 'TOGGLE';
    }
  | {
      type: 'CLOSE';
    }
  | {
      type: 'TARGET_DOWN';
    }
  | {
      type: 'TARGET_UP';
    }
  | SelectDispatch
  | SetOptionsDispatch;

type SelectDispatch = {
  type: 'SELECT';
  payload: number;
};

type SetOptionsDispatch = {
  type: 'SET_OPTIONS';
  payload: { index: number; value: string; label: string }[];
};

const selectReducer = (
  state: SelectState,
  action: SelectAction
): SelectState => {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        selected: action.payload,
        targetedIndex: action.payload,
      };
    case 'TARGET_UP':
      return {
        ...state,
        targetedIndex: state.targetedIndex - 1,
      };
    case 'TARGET_DOWN':
      return {
        ...state,
        targetedIndex: state.targetedIndex + 1,
      };
    case 'OPEN':
      return {
        ...state,
        open: true,
      };
    case 'CLOSE':
      return { ...state, open: false };
    case 'TOGGLE':
      return { ...state, open: !state.open };

    case 'SET_OPTIONS':
      return {
        ...state,
        options: action.payload,
      };

    default:
      throw new Error('Invalid action type');
  }
};

export class Dispatcher {
  constructor(private dispatch: React.Dispatch<SelectAction>) {}

  select = (payload: SelectDispatch['payload']) => {
    this.dispatch({ type: 'SELECT', payload });
  };

  targetUp = () => {
    this.dispatch({ type: 'TARGET_UP' });
  };

  targetDown = () => {
    this.dispatch({ type: 'TARGET_DOWN' });
  };

  open = () => {
    this.dispatch({ type: 'OPEN' });
  };

  close = () => {
    this.dispatch({ type: 'CLOSE' });
  };

  toggle = () => {
    this.dispatch({ type: 'TOGGLE' });
  };

  setOptions = (payload: SetOptionsDispatch['payload']) => {
    this.dispatch({ type: 'SET_OPTIONS', payload });
  };
}

export enum Keys {
  Enter = 'Enter',
  Escape = 'Escape',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Digit = 'Digit',
  Key = 'Key',
}

const useClickOutside = <Element extends HTMLElement>(
  refs: any[],
  handler: () => void
) => {
  useEffect(() => {
    const onClick = (e: Element) => {
      const isClickedOutside = refs.map((ref) => {
        if (ref.current && !ref.current.contains(e.target)) {
          return true;
        }
      });

      if (isClickedOutside.every((el) => el === true)) {
        handler();
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  });
};
