const userModel = require('../models/user');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

exports.register = async (req, res) => {
	const { email, password, phone, authority } = req.body;
	try {
		//const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

		const cipher = crypto.createCipheriv(algorithm, key, iv);
		let hashedPassword = cipher.update(password, 'utf8', 'base64');
		hashedPassword += cipher.final('base64');

		const newUser = new userModel({
			email,
			password: hashedPassword,
			phone,
			authority
		});

		await newUser.save();
		res.status(201).send('User registered successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while registering user');
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });

		const decipher = crypto.createDecipheriv(algorithm, key, iv);
		user.password = crypto.createDecipheriv(algorithm, key, iv);
		let getPassword = decipher.update(user.password, 'base64', 'utf8');
		getPassword += decipher.final('utf8');

		// 사용자가 존재하지 않는 경우
		if (!user) {
			return res.status(401).json({ message: '잘못된 이메일입니다.' });
		}

		// 비밀번호를 복호화하여 비교
		if (password !== getPassword) {
			return res.status(401).json({ message: '잘못된 비밀번호입니다.' });
		}

		res.status(200).json({
			email: user.email,
			authority: user.authority,
			message: '로그인 성공'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: '서버 오류' });
	}
};

exports.findPassword = async (req, res) => {
	const { email } = req.body;

	const decipher = crypto.createDecipheriv(algorithm, key, iv);

    try {
        const user = await userModel.findOne({ email }); // 이메일로 사용자 찾기
		
		user.password = crypto.createDecipheriv(algorithm, key, iv);
		let findPassword = decipher.update(user.password, 'base64', 'utf8');
		findPassword += decipher.final('utf8');

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.status(200).json({ password: findPassword }); // 비밀번호 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

exports.findEmail = async (req, res) => {
	const { phone } = req.body;

    try {
        const user = await userModel.findOne({ phone }); // 전화번호로 사용자 찾기
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.status(200).json({ email: user.email }); // 이메일 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}
