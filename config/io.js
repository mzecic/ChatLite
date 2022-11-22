let io;

module.exports = {
  init,
  getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function(socket) {
        console.log('Client socketed connected');

    // Other message listeners below here (stay inside of this 'connection' callback)

    socket.on('inbox', function(selectedInbox) {
        socket.join(selectedInbox);
        console.log('User Joined Inbox: ' + selectedInbox)
    })

    socket.on('send-message', function(message, secondUser, selectedInbox) {
        if (selectedInbox.users.includes(secondUser._id)) {
            socket.in(secondUser._id).emit('receive-message', message, secondUser, selectedInbox)
        }
        console.log(message)
        console.log(selectedInbox.users)
    })

    });
}

// Used to access the io object from controller modules
function getIo() {
  return io;
}
