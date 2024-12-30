const mongoose = require("mongoose");

// 테이블 (데이터셋) 정의
const goodSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

// 상품 모델로 사용
const Goods = mongoose.model("Goods", goodSchema);
module.exports = Goods;