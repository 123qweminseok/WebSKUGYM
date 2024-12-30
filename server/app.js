const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');

// 데이터베이스 연결 설정
require('./config/db');

// 미들웨어 등록
app.use(express.json()); 
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

// 라우트 설정
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goodsRouter = require('./routes/goods');
const boardRouter = require('./routes/board');

// 사용자
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 상품
app.use('/goods', goodsRouter);
// 게시판
app.use('/board', boardRouter);

// 서버 시작
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});