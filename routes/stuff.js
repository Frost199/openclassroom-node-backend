const express = require('express');
const stuffController  = require('../controller/stuff');
const auth = require('../middleware/auth');
const router = express.Router();

//Create New thing
router.post('/', auth, stuffController.createThing);

//view all about a particular thing
router.get('/:id', auth, stuffController.getOneThing);

//Update a particular thing
router.put('/:id', auth, stuffController.modifyThing);

//delete a particular thing
router.delete('/:id', auth, stuffController.deleteThing);

//View all things
router.get('/', auth, stuffController.getAllStuff);

module.exports = router;
