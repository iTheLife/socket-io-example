const app = require('express')();
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on("chat message", (arg1, arg2, callback) => {
        console.log(arg1); // 1
        console.log(arg2); // { name: "updated" }
        callback({
            status: "ok",
            result: 123
        });
    });
});

const adminNamespace = io.of("/admin");
adminNamespace.on('connection', (socket) => {
    socket.on("chat message", (arg1, arg2, callback) => {
        console.log(arg1); // 1
        console.log(arg2); // { name: "updated" }
        callback({
            status: "ok"
        });
        adminNamespace.emit('chat message', arg1);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
