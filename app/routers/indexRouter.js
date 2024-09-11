const {
    check,
    validationResult
} = require('express-validator');

const express = require('express');
const router = express.Router()

const controller = require('../controllers/indexController');


router.get('/', controller.homepage);
router.post('/api/people', controller.createPeople);


router.post('/api/singlepeople', controller.getPeople);

router.post('/api/updatepeople', controller.updatepeople);

router.post('/api/delete', controller.delete);

router.post('/api/searchuser',controller.getSearchData)

router.post('/api/allpeople',controller.getAllPeople)

module.exports = router;