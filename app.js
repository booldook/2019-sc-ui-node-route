const express = require('express');	// express module 참조
const app = express();	// express 실행
const log = console.log;	// console.log 참조

// 서버 구동
app.listen(3000, () => {
	log('Connected 3000 port');
});

// Router 구현
app.use(express.static('public'));	//Static 요청 처리
app.get('/get_test', (req, res) => {
	res.send("<h1>Hello World</h1>");
});

app.get("/score_save", (req, res) => {
	var userName = req.query.uname;
	var kor = req.query.kor;
	res.send(`클라이언트가 전달 해 준 변수는 ${userName} / ${kor} 입니다.`);
});
app.post("/score_save", (req, res) => {
	res.send("POST 요청");
});
