// MONGO user: manny
// MONGO password for user: 14M48nVzC5AbDwsm
// MONGO Connection: mongodb+srv://manny:<password>@cluster0-dmszo.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');

const app = express();

//connecting to database
mongoose.connect('mongodb+srv://manny:14M48nVzC5AbDwsm@cluster0-dmszo.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

//avoiding CORS(Cross Origin Resource Sharing), this adds to the headed
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type,' +
        ' Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes);

module.exports = app;
