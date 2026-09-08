'use strict';

const router = require('express').Router();
const petController = require('../controllers/petController');
const upload = require('../middlewares/upload');

router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', upload.single('image'), petController.createPet);
router.put('/:id', upload.single('image'), petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;