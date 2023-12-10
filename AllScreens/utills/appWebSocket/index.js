// import { io } from "socket.io-client";
// const socket = io.connect("ws://139.84.135.204:8001/ws/room/");
const appWebSocket = new WebSocket('ws://139.84.135.204:8001/ws/room/');

export default appWebSocket;