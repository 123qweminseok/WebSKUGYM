const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boardList', boardController.boardList);
router.post('/boardAdd', boardController.boardAdd);
router.delete('/boardDelete/:postId', boardController.boardDelete);
router.put('/boardUpdate/:postId', boardController.boardUpdate);

module.exports = router;