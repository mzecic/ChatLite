const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config()
require('./config/database')

const app = express();

const http = require('http'). Server(app);
require('./config/io').init(http);

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/inbox', require('./routes/api/inbox'));
app.use('/api/messages', require('./routes/api/messages'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001

http.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});
