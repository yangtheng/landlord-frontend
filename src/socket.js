import io from "socket.io-client";

const ENDPOINT = '54.85.245.18:5000' || 'localhost:5000';

export const socket = io(ENDPOINT);
