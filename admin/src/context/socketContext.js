import { createContext } from "react";
import { io } from "socket.io-client";

const serverURL = process.env.REACT_APP_SERVER_URL;

export const socket = io(serverURL);
export const SocketContext = createContext();
