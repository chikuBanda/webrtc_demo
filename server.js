var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port:8080});

console.log("Server running...")

var clients = {};

wss.on('connection', (connection) => {
    console.log('user connected');

    connection.on('message', function message(data) {
        var message = JSON.parse(data);
        //var message = data;

        switch (message.type){
            case "register":
                //console.log("it's a register message");
                clients[message.id] = connection;
                console.log(message.id + ' has been registered')
                break;
            case "send":
                //console.log("it's a send message");
                var conn = clients[message.dest];
                //console.log(conn);
                
                conn.send(JSON.stringify(message.message));
                break;
            case "offer":
                var conn = clients[message.dest];
                conn.send(JSON.stringify(message));
                console.log("offer")
                break;
            
            case "answer":
                var conn = clients[message.dest];
                conn.send(JSON.stringify(message));
                console.log("sending answer")
                break;

            case "candidate":
                var conn = clients[message.dest];
                conn.send(JSON.stringify(message));
                console.log("sending new ice candidate")
                break;

            default:
                console.log("unrecognised message")

        }

        //sendToOtherUser(connection, message.message)
    })

    //sendToOtherUser(connection, "hello");
})