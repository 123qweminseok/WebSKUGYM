const goodModel = require('../models/goods');

exports.goodsReg = async (req, res) => {
	try {
		// 요청 바디에서 상품 정보 추출
		const { name, count, price, img } = req.body;

		// 새로운 상품 생성
		const newGood = new goodModel({
			name: name,
			count: count,
			price: price,
			img: img
		});

		// 상품 저장
		const savedGood = await newGood.save();

		// 클라이언트에 성공 응답 전송
		res.status(201).json(savedGood);
	} catch (error) {
		// 오류 발생 시 클라이언트에 실패 응답 전송
		console.error(error);
		res.status(500).json({ error: '상품 등록 중 오류가 발생했습니다.' });
	}
};

exports.goodsList = async (req, res) => {

	try {
		// 상품 목록 조회
		const goods = await goodModel.find();

		// 상품 목록을 클라이언트에 반환
		res.status(200).json(goods);
	} catch (error) {
		// 오류 처리
		console.error(error);
		res.status(500).json({ error: '상품 목록을 가져오는 중에 오류가 발생했습니다.' });
	}
};

exports.goodsCount = async (req, res) => {
	const { _id, count } = req.body;

	try {
		let product = await goodModel.findById(_id); // 해당 _id를 가진 상품 조회

		if (!product) {
			return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
		}

		// 클라이언트로부터 받은 count로 상품의 수량을 업데이트
		product.count = count;

		await product.save(); // 변경된 상품 정보 저장

		res.status(200).json({ message: "수량이 업데이트되었습니다.", product: product });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "서버 오류로 인해 수량 업데이트에 실패했습니다." });
	}
};