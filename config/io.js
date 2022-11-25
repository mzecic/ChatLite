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
            // console.log(onlineUsers);
        })

        socket.on('disconnect', function() {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
            console.log('User Disconnected', onlineUsers);
            io.emit('get-users', onlineUsers);
        })


        socket.on('inbox', function(selectedInbox) {
            socket.join(selectedInbox);
            socket.on('send-message', function(message, secondUser, selectedInbox) {
                io.to(selectedInbox._id).emit('receive-message', message, secondUser, selectedInbox)
            })
        })


        // socket.on('text', function(text, selectedInbox) {
        //     io.to(selectedInbox).emit('receive-text', text)
        // });


        // socket.on('send-message', function(message, secondUser, selectedInbox) {
        //     socket.join(selectedInbox._id)
        //     io.to(selectedInbox._id).emit('receive-message', message, secondUser, selectedInbox)
        // })

    });
}

// Used to access the io object from controller modules
function getIo() {
  return io;
}
