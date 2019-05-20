// 서버구축
const express = require('express');
const app = express();
const db = require('./mysql_conn');
const mysql = db.mysql;
const conn = db.conn;
conn.connect();

app.listen(3000, () => {
	console.log("Connected at 3000 port http://127.0.0.1:3000");
});

// Router
app.locals.pretty = true;
app.use(express.static("www"));
app.set('view engine', 'pug');
app.set('views', './views');

app.get("/book/:id", (req, res) => {
	var books = [
		{name: "홍길동전", content: "아버지를 아버지라..."},
		{name: "왕좌의게임", content: "유론이 죽다니..."},
		{name: "춘향전", content: "변사또 이놈이..."},
		{name: "별주부전", content: "토끼 간은 만병통치약~"},
		{name: "구운몽전", content: "한여름밤의 꿈~"}
	];
	var id = req.params.id;
	var vals = {
		docTitle: "도서 검색 시스템 입니다.",
		cssName: "book",
		jsName: "book",
		logoFile: "/img/logo.png",
		books,
		id
	};
	res.render('book', vals);
});

/*
app.get("/food", (req, res) => {
	var foods = ["짜장면", "짬뽕", "볶음밥", "탕수육", "깐풍기"];
	var id = req.query.id;
	res.send(`
	<h1>홍콩반점에 오신것을 환영합니다.</h1>
	<h3>당신이 주문하신 음식은 ${foods[id]}입니다.</h3>
	`);
});
*/


