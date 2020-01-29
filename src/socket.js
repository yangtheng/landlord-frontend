import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_URL || 'localhost:5000';

export const socket = io(ENDPOINT);
