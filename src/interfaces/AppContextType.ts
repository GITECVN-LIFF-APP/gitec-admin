import React from 'react';
import { InitializeState, MessageAction } from 'src/reducers/MessageReducer';
import { Nullable } from './common';
export interface AppContextType {
  messageReducer: [
    status: Nullable<InitializeState>,
    dispatch: React.Dispatch<MessageAction>
  ];
}
