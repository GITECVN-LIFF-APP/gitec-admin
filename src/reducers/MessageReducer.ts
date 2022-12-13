export interface InitializeState {
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export const initialState: InitializeState = {
  isError: false,
  isSuccess: false,
  message: ''
};

export enum MESSAGE_ACTION {
  SET_MESSAGE = 'SET_MESSAGE',
  REMOVE_MESSAGE = 'REMOVE_MESSAGE'
}

interface SetMessageAction {
  type: MESSAGE_ACTION.SET_MESSAGE;
  payload: InitializeState;
}
interface RemoveMessageAction {
  type: MESSAGE_ACTION.REMOVE_MESSAGE;
}

export type MessageAction = SetMessageAction | RemoveMessageAction;

const MessageReducer = (
  state: InitializeState | null,
  action: MessageAction
) => {
  switch (action.type) {
    case MESSAGE_ACTION.SET_MESSAGE:
      const { isError, isSuccess, message } = action.payload;
      return {
        ...state,
        isError: isError,
        isSuccess: isSuccess,
        message: message
      };
    case MESSAGE_ACTION.REMOVE_MESSAGE:
      return initialState;
    default:
      return { ...state };
  }
};

export default MessageReducer;
