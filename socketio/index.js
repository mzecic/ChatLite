const io = require('socket.io')(8800, {
    cors :{
        origin: "http://localhost:3000"
    }
})

let socketUsers = []

io.on('connection', function(socket) {
    //connecting users to socket.io
    socket.on('add-user', function(userId) {
        if(!socketUsers.some(user => user.userId === userId)) {
            socketUsers.push({
                userId: userId,
                socketId: socket.id
            })
        }
        console.log("Connected Users", socketUsers)
        io.emit('get-users', socketUsers)
    })
    //disconnecting users
    socket.on('disconnect', function() {
        socketUsers = socketUsers.filter(user => user.socketId !== socket.id)
        console.log('User Disconnected', socketUsers)
        io.emit('get-users', socketUsers)
    })
})
