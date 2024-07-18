const express = require('express');
const router = express.Router();
const { getTreasuresByDistanceAndPrize, getlistTreasuresByProximity } = require('../controllers');

router.get('/', getTreasuresByDistanceAndPrize);
router.get('/proximity', getlistTreasuresByProximity);

module.exports = router;