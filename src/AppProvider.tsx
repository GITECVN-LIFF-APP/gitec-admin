import { AppContextType } from 'src/interfaces/AppContextType';
import React, { createContext, useReducer, ReactNode } from 'react';

import { Nullable } from 'src/interfaces/common';
import MessageReducer, {
  InitializeState,
  initialState,
  MessageAction,
  MESSAGE_ACTION
} from 'src/reducers/MessageReducer';

export const AppContext = createContext(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(MessageReducer, initialState);
  const addMessage = (message: string, status: string) => {
    const isStatus =
      status == 'error'
        ? { isError: true, isSuccess: false }
        : { isError: false, isSuccess: true };
    dispatch({
      type: MESSAGE_ACTION.SET_MESSAGE,
      payload: {
        ...isStatus,
        message: message
      }
    });
  };

  const removeMessage = () => {
    dispatch({
      type: MESSAGE_ACTION.REMOVE_MESSAGE
    });
  };

  return (
    <AppContext.Provider value={{ ...state, addMessage, removeMessage }}>
      {children}
    </AppContext.Provider>
  );
};
