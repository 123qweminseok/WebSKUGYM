const boardModel = require('../models/board');

// 리스트
exports.boardList = async (req, res) => {
	try {
		const boards = await boardModel.find();
		res.json(boards);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: '게시글 목록을 가져오는 중 오류가 발생했습니다.' });
	}
};

// 등록
exports.boardAdd = async (req, res) => {
	const { title, content, createby } = req.body;
	try {
		const newBoard = new boardModel({
			title,
			content,
			createby
		});
		await newBoard.save();
		res.status(201).json(newBoard);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
	}
};

// 수정
exports.boardUpdate = async (req, res) => {
	const { postId } = req.params; // 요청 URL에서 게시물 ID를 가져옵니다.
	const { title, content, createby } = req.body; // 요청 본문에서 수정된 데이터를 가져옵니다.

	try {
		// 게시물을 ID로 찾아서 업데이트합니다.
		const updatedPost = await boardModel.findByIdAndUpdate(postId, { title, content, createby }, { new: true });

		if (!updatedPost) {
			return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
		}

		res.status(200).json(updatedPost); // 업데이트된 게시물을 응답으로 보냅니다.
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류: 게시물을 업데이트하는 중 오류가 발생했습니다.' });
	}
};

// 삭제
exports.boardDelete = async (req, res) => {
	const { postId } = req.params; // 요청 URL에서 게시물 ID를 가져옵니다.

	try {
		// 게시물을 ID로 찾아서 삭제합니다.
		const deletedPost = await boardModel.findByIdAndDelete(postId);

		if (!deletedPost) {
			return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
		}

		res.status(200).json({ message: '게시물이 성공적으로 삭제되었습니다.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류: 게시물을 삭제하는 중 오류가 발생했습니다.' });
	}
};