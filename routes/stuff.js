const express = require('express');
const stuffController  = require('../controller/stuff');
const router = express.Router();

//Create New thing
router.post('/', stuffController.createThing);

//view all about a particular thing
router.get('/:id', stuffController.getOneThing);

//Update a particular thing
router.put('/:id', stuffController.modifyThing);

//delete a particular thing
router.delete('/:id', stuffController.deleteThing);

//View all things
router.get('/', stuffController.getAllStuff);

module.exports = router;
