const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/goodsController');

router.post('/goodsReg', goodsController.goodsReg);
router.get('/goodsList', goodsController.goodsList);
router.post('/goodsCount', goodsController.goodsCount);

module.exports = router;