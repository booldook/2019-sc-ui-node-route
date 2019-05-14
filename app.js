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

app.get('/page', (req, res) => {
	var param = req.query.page;
	var now = param - 1;
	var books = [
		{title: "별주부전", cont: "용왕이 나의 간을 노리고..."},
		{title: "홍길동전", cont: "아버지를 아버지라..."},
		{title: "구운몽전", cont: "한여름밤에 꿈을 꿨는데..."},
		{title: "춘향전", cont: "변사또 이놈이..."}
	];
	var html = `
	<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>도서목록</title>
		<link rel="stylesheet" href="/css/fa.min.css">
		<link rel="stylesheet" href="/css/animate.css">
		<link rel="stylesheet" href="/css/bootstrap.min.css">
		<link rel="stylesheet" href="/css/base.css">
		<link rel="stylesheet" href="/css/book.css">
		<script src="/js/jquery-3.3.1.min.js"></script>
		<script src="/js/bootstrap.min.js"></script>
		<script src="/js/anime.min.js"></script>
		<script src="/js/wow.min.js"></script>
		<script src="/js/util.js"></script>
	</head>
	<body>
		<div class="container">
			<div class="jumbotron">
				<h2>도서목록</h2>
			</div>
			<ul class="navis">`;
	for(var i in books) {	
		if(now == i) html += `<li class="navi navi_sel" onclick="loc(${(Number(i)+1)});">${books[i].title}</li>`;
		else html += `<li class="navi" onclick="loc(${(Number(i)+1)});">${books[i].title}</li>`;
	}
	html+= `</ul>`;
	if(now >= 0 && now <= 3) html+= `<div class="conts pa bor-a radius mt"><h5>${books[now].cont}</h5></div>`;
	html+= `</div>
		<script src="/js/book.js"></script>
	</body>
	</html>`;
	res.send(html);
});
