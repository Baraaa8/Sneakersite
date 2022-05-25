const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(
    session({
        secret: 'AIDFJAGOaofijd'
    })
);

// Load routing
require('./route/index')(app, __dirname);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
})

app.listen(3000, function () {
    console.log("Hello, meet me on :3000");
});