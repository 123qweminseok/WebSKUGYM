const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('서버연결 완료');
});

module.exports = router;