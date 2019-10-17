const http = require('http');
const express = require('express');
const app = express();
const session = require('express-session');
const PORT = 7778;

const cookieParser = require('cookie-parser');

//disable what app used on server
app.disable('x-powered-by');

// session middleware
app.use(
  session({
    secret: 'imaguru gay guru uru ru',
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
  })
);

const Router = require('./modules/routes');

Router(app);
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server started... on ${PORT}`));
