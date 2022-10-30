export type SelectState = {
  options: {
    index: number;
    label: string;
    value: string;
  }[];
  open: boolean;
  selectedIndex?: number;
  activeIndex: number;
};

export type SelectAction =
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
  | SetOptionsDispatch
  | SetActiveDispatch;

export type SelectDispatch = {
  type: 'SELECT';
  payload: number;
};

export type SetOptionsDispatch = {
  type: 'SET_OPTIONS';
  payload: { index: number; value: string; label: string }[];
};

export type SetActiveDispatch = {
  type: 'SET_ACTIVE';
  payload: number;
};

export const selectReducer = (
  state: SelectState,
  action: SelectAction
): SelectState => {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        selectedIndex: action.payload,
        activeIndex: action.payload,
      };

    case 'SET_ACTIVE':
      return {
        ...state,
        activeIndex: action.payload,
      };

    case 'TARGET_UP':
      return {
        ...state,
        activeIndex: state.activeIndex - 1,
      };
    case 'TARGET_DOWN':
      return {
        ...state,
        activeIndex: state.activeIndex + 1,
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
  setActive = (payload: SetActiveDispatch['payload']) => {
    this.dispatch({ type: 'SET_ACTIVE', payload });
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
