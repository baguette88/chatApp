// Slightly modified from socket.io starter docs
// https://github.com/socketio/chat-example/blob/master/index.html

// Dependencies
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Port
const PORT = process.env.PORT || 3000

// Index route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket listeners and handlers
io.on('connection', socket => {
    console.log(socket.id)
    console.log('new user connected')
    io.emit('join', socket.id + ' has joined!');

    socket.on('chat message', function(msg){
        console.log(msg)
        io.emit('chat message', socket.id + ': ' + msg);
    });

    socket.on('disconnect', () => {
        io.emit('disconnect', socket.id + ' has disconnect');
    });
})

// Server listening
http.listen(PORT, () => {
    console.log('server is listening on ', PORT)
})