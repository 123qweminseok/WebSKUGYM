const mongoose= require("mongoose");

// 테이블 (데이터셋) 정의
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true
	},
	authority: {
		type: String,
		num: ['Admin', 'User'],
		required: true
	}
});

// 모률로 사용
module.exports = mongoose.model("User", userSchema);