const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const auth = require('../middleware/auth');

router.route('/brand/:id')
.get(brandController.getBrand)
.delete( auth('deleteAny','brand'), brandController.deleteBrand)

router.post('/brand', auth('createAny','brand'), brandController.addBrand) // only authenticated rules can create brands
router.get('/all',brandController.getBrands)


module.exports = router;