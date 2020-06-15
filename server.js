const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const sequelize = require('./databaseConnection');
const path = require('path');
const associations = require('./models/Associations');
const user = require('./routes/User.routes');
const pretplatnik = require('./routes/Pretplatnik.routes');
const kvar = require('./routes/Kvar.routes');


const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    //debug("Listening on " + bind);
    console.log("Listenning on " + bind);

};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//Adding authentification routes to server
app.use(cors());


app.use('/api/auth', user);
app.use('/api/pretplatnik', pretplatnik);
app.use('/api/kvar', kvar)
// app.use('/api/dispatcher', dispatcher);
// app.use('/api/fetcher', fetcher);

// app.use('/api/safety/trailer', trailer);
// app.use('/api/safety/truck', truckR);
// app.use('/api/safety/driver', driverR);
// app.use('/api/safety/user', userR);
// app.use('/api/safety/expiration', expR);



app.use("/", express.static(path.join(__dirname, "frontend")));


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
  });

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);