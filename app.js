const express = require('express');
const favicon = require('serve-favicon');
const http = require('http');
const exphbs = require('express-handlebars');
const socketio = require('socket.io');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MailComposer = require('nodemailer/lib/mail-composer');
const Filter = require('bad-words');
// const CronJob = require('cron').CronJob;
const aws = require('aws-sdk');

const {cronJobErrorFixingFaveu, cronJobErrorFixingChat} = require('./routes/modules/cron/cronJobErrorFixing')
const {generateMessage} = require('./routes/modules/utils/message')
const { addUser, removeUser, getUser, getUsersInRoom} = require('./routes/modules/utils/users')
// const {Chat} = require('./routes/models/chat')

const app = express()

const index = require('./routes/index');
const faveu = require('./routes/faveu');

const debug = require('debug')('FaveU:server');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Instantiate SES.
var ses = new aws.SES();

var hbs = exphbs.create({
    extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/images/favicon', 'faveu-favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(logger('combined'));

// Prevent CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/faveu', faveu);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
  
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

// Please set PORT into '3000'
const port = normalizePort('3000');
app.set('port', port);
// const port = process.env.PORT || 300

function normalizePort(val) {
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
}

// Cron Job running
cronJobErrorFixingFaveu.start();
cronJobErrorFixingChat.start();

const server = http.createServer(app)
const io = socketio(server);

// socket IO
io.on('connection', (socket) => {
    console.log('New Websocket connected')
    
    socket.on('join', (msg, callback) => {
        socket.join(msg.roomname)
        socket.broadcast.to(msg.roomname).emit('message', generateMessage(msg.username, msg.customId, `${msg.username} has joined!`))
        callback()
    })

    socket.on('sendMsg', (msg, callback) => {
        const filter = new Filter();
        if (filter.isProfane(msg.message)) {
            return callback('Profanity is not allowed')
        }
        io.to(msg.roomname).emit('message', generateMessage(msg.username, msg.customId, msg.message))
        callback()
    })

    socket.on('disconnect', (msg) => {
        io.to(msg.roomname).emit('message', generateMessage(msg.username, msg.customId, `${msg.username} has left!`))
    })
})

/* Event listener for HTTP server "error" event. */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/* Event listener for HTTP server "listening" event. */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

server.on('error', onError)
server.on('listening', onListening);

server.listen(port, () => {
    console.log("Server is running on port " + port)
});

//   module.exports = app;

// socket.emit, 
// io.emit => everyone, 
// socket.broadcast.emit => everyone except for me
// io.to().emit => everyone in a specific room
// socket.broadcast.to().emit => everyone except for me in a specific room

// const { error, user } = addUser({ id: socket.id, name: msg.username, customId: msg.customId, room: msg.roomname })
// if (error) {
//     return callback(error)
// }

// socket.emit('message', generateMessage('Welcome!'))
// io.to(msg.roomname).emit('message', generateMessage(msg.username, msg.customId, `${msg.username} has joined!`))
         
// const user = getUser(socket.id)

// const user = removeUser(socket.id)
// console.log("user: ", user)
    // if (user) {
    // }