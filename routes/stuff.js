const express = require('express');
const stuffController  = require('../controller/stuff');
const router = express.Router();

//middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

//Create New thing
router.post('/', auth, multer, stuffController.createThing);

//view all about a particular thing
router.get('/:id', auth, stuffController.getOneThing);

//Update a particular thing
router.put('/:id', auth, multer, stuffController.modifyThing);

//delete a particular thing
router.delete('/:id', auth, stuffController.deleteThing);

//View all things
router.get('/', auth, stuffController.getAllStuff);

module.exports = router;
