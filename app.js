const express = require("express");
const createError = require('http-errors');
const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// database
const db = require("./models");

db.sequelize.sync({logging: console.log});
// force: true will drop the table if it already exists
//db.sequelize.sync({alter: true}).then(() => {
//    console.log('Drop and Resync Database with { force: true }');
//});


// routes
require('./routes')(app);


app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});
module.exports = app;
// set port, listen for requests
//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}.`);
//});