const { on } = require('../models/user');

let io;

module.exports = {
  init,
  getIo
}

function init(http) {
    io = require('socket.io')(http);

    let onlineUsers = [];
    let onlineUsersObj = [];

    io.on('connection', function(socket) {
        console.log('Client socketed connected');

    // Other message listeners below here (stay inside of this 'connection' callback)

        socket.on('register-user', function(newUserId, allUsers) {
            if(!onlineUsers.some(user => user.userId === newUserId)) {
                onlineUsers.push({
                    userId: newUserId,
                    socketId: socket.id
                })
            }
            io.emit('get-users', onlineUsers);
            console.log(onlineUsers);
        })

        socket.on('disconnect', function() {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
            console.log('User Disconnected', onlineUsers);
            io.emit('get-users', onlineUsers);
        })

        socket.on('setup', function(user) {
            socket.join(user._id);
            socket.emit('connection');
        })

        socket.on('join-chat', function(roomId) {
            socket.join(roomId);
            console.log('User Joined Room', roomId);
        })

        socket.on('leave-room', function(roomId, inbox, user) {
                console.log('user left room:')
                socket.leave(roomId);
        })

        socket.on('typing', function(roomId, user) {
                console.log('typing sent to:', roomId);
                socket.in(roomId).emit('typing', roomId);
        })
        socket.on('typing-stopped',function(roomId, user) {
                socket.in(roomId).emit('typing-stopped', roomId);
        })

        socket.on('new-message', function(updatedInbox) {
            updatedInbox.users.forEach(user => {
                if(user === updatedInbox.messages[updatedInbox.messages.length - 1].senderId) return;
                socket.in(user).emit('message-receive', updatedInbox);
            })
        })

        socket.on('new-inbox', function(newInbox, clickedUser) {
            socket.in(clickedUser[0]._id).emit('update-inbox', newInbox);
            console.log("this is: ", clickedUser[0]._id);
        })

    });
}

// Used to access the io object from controller modules
function getIo() {
  return io;
}
