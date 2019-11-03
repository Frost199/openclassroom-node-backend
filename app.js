// MONGO user: manny
// MONGO password for user: 14M48nVzC5AbDwsm
// MONGO Connection: mongodb+srv://manny:<password>@cluster0-dmszo.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

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

//Create New thing
app.post('/api/stuff', (req, res, next)=>{
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save()
        .then(() => {
            res.status(201).json({
               message: "Post saved successfully"
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'qweweft',
            title: 'My first stuff',
            description: 'Information about my first stuff',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 4900,
            userId: 'werfn2345rnjg',
        },
        {
            _id: 'qweweftasdq21',
            title: 'My second stuff',
            description: 'Information about my second stuff',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 6000,
            userId: 'werfn2345rnjg',
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;
