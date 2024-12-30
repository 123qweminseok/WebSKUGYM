const mongoose= require("mongoose");

// 테이블 (데이터셋) 정의
const boardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	createby: {
		type: String
	},
});

// 모률로 사용
const Board = mongoose.model("Board", boardSchema);
module.exports = Board