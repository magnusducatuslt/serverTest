const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 7777;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server started... on ${PORT}`));

const Router = require('./modules/routes');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors());
Router(app);
