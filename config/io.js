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
            socket.join(selectedInbox._id);
            io.to(selectedInbox._id).emit('hello', 'hello')
            console.log('User Joined Inbox: ' + selectedInbox)
        })

        // socket.on('text', function(text, selectedInbox) {
        //     io.to(selectedInbox).emit('receive-text', text)
        // });


        socket.on('send-message', function(message, secondUser, selectedInbox) {
            socket.join(selectedInbox._id)
            io.to(selectedInbox._id).emit('receive-message', message, secondUser, selectedInbox)
            console.log(message)
            console.log(selectedInbox.users)
        })

    });
}

// Used to access the io object from controller modules
function getIo() {
  return io;
}
