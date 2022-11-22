import { io } from 'socket.io-client';

const socket = io();

export default socket;

socket.on('connect', function() {
    console.log(`Socket connected to socket.io server`);
})


