import {io} from 'socket.io-client';
import React from 'react';

const socketUrl = "http://localhost:5000";
export const socket = io(socketUrl);
//app context
export const AppContext = React.createContext({})