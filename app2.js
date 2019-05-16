// 서버구축
const express = require('express');
const app = express();
app.listen(80, () => {
	console.log("Connected at 3000 port http://127.0.0.1:80");
});

// Router
app.locals.pretty = true;
app.use(express.static("www"));
app.set('view engine', 'pug');
app.set('views', './views');

app.get("/book/:id", (req, res) => {
	var books = ["묵향1", "묵향2", "묵향3", "묵향4", "묵향5"];
	var id = req.params.id;
	var vals = {
		docTitle: "도서 검색 시스템 입니다.",
		cssName: "book",
		logoFile: "logo.png",
		navs: books,
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
