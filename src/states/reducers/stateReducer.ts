export type State = {
  selectedExam: string;
  messages: { unread_count: number };
  drawer: boolean;
  users: { uid: number; name: string };
};

export interface StateAction {
  readonly type: string;
  readonly payload?: any;
}

export const stateReducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case "clear":
      return {
        ...state,
        messages: { unread_count: 0 },
        navList: [],
        users: { uid: -1, name: "nobody" },
      };
    case "set user": {
      return {
        ...state,
        users: action.payload,
      };
    }
    case "set messages": {
      return {
        ...state,
        messages: { unread_count: action.payload },
      };
    }
    case "set drawer":
      return { ...state, drawer: !state.drawer };
    case "set exam":
      return { ...state, selectedExam: action.payload };
    default:
      return state;
  }
};
