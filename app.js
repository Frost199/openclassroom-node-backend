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
app.post('/api/stuff', (req, res, next) => {
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

//view all about a particular thing
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((thing) => {
        res.status(200).json(thing)
    }).catch(error => {
        res.status(404).json({
            error: error
        })
    });
});

//Update a particular thing
app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing)
        .then(() => {
            res.status(201).json({
                message: 'Thing updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
               error: error
            });
        });
});


//View all things
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then((things) => {
            res.status(200).json(things)
        })
        .catch(error => {
            res.status(400).json({
                error: error
            })
        });
});

module.exports = app;
