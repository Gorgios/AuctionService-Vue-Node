const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.NODE_ENV);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === "development"){
app.use(cors({
    credentials: true,
    origin: 'https://localhost:8081'
}
));
}
// machnaizm sesji – z wykorzystaniem ciasteczek
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const expressSession = require("express-session");
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('./mongoose');
const chatSockets = require('./sockets/chat');
const bidSockets = require('./sockets/bid');
const secret = process.env.SECRET;
const key = process.env.KEY;
const store = new MongoStore({
    mongooseConnection: mongoose.connection
});
app.use(expressSession({
    key: key,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: store 
}));
if (process.env.NODE_ENV === "production"){
app.use(express.static('dist'));
}
const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

// routing aplikacji
const routes = require("./routes");
app.use(routes);
app.use((_, res) => {
    res.sendStatus(404);
});
const socketIo = require('socket.io');
const passportSocketIo = require('passport.socketio');
const server = require("./https")(app);

const io = socketIo.listen(server);
const onAuthorizeSuccess = (data, accept) => {
    accept();
};
const onAuthorizeFail = (data, message, error, accept) => {
    accept(new Error(error));
};
io.use(passportSocketIo.authorize({
    passport: passport,
    key:key,
    cookieParser: cookieParser,
    secret: secret,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}));


io.on('connection', (socket) => {
    chatSockets(socket,io);
    bidSockets(socket,io);
});

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME;
server.listen(port, () => {
    console.log(`Serwer działa pod adresem: https://${hostname}:${port}`);
});