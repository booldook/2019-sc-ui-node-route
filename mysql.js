// 서버구축
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const db = require(path.join(__dirname, "mysql_conn"));
const mysql = db.mysql;
const conn = db.conn;

const pageCnt = 3;		// 한페이지에 나타날 데이터 갯수
const pageDiv = 3;		// 페이저 한셋트당 보여질 페이지 갯수

// 서버실행
app.listen(3000, () => {
	console.log("Connected at 3000 port http://127.0.0.1:3000");
});

// 초기설정
app.locals.pretty = true;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
conn.connect();
// ROUTER
app.get(["/book", "/book/:page"], (req, res) => {
	var rows = 0;				// 총 데이터 갯수
	var pageTotal = 0;	// 총 페이지 수
	var page = req.params.page;
	if(page === undefined) page = 1;

	var sql = " SELECT count(id) FROM book ";
	conn.query(sql, (err, result) => {
		if(err) {
			console.log(err);
			res.send("에러");
		}
		else {
			pageTotal = result[0];
			res.send(pageTotal);
		}
	});
	/*
	var sql = " SELECT * FROM book ORDER BY id DESC LIMIT 0, 3 ";
	conn.query(sql, (err, result, field) => {
		if(err) {
			console.log(err);
			res.send("에러");
		}
		else {
			var vals = {
				cssName: "book",
				jsName: "book",
				smTit: "도서 목록 리스트",
				items: result
			}
			console.log(result);
			res.render('book_list', vals);
		}
	});
	*/
});



app.get("/test/", (req, res) => {
	/*
	var sql = " INSERT INTO book SET title=?, author=?, price=?, isbn=?, sdate=?, wdate=?, cnt=?, sellcnt=?, summary=?, img=? ";
	var vals = ['별주부전', '거북이', '20000', '12-3456-7890', '2019-05-21', '2019-05-21 09:11:11', 0, 0, '거북이가 용왕을...', ''];
	*/
	var sql = `INSERT INTO book SET 
	title 	= '홍길동전',
	author 	= '허균',
	price 	= 18000,
	isbn 		= '09-2345-3456',
	sdate 	= '1650-12-01',
	wdate 	= '2019-05-17 11:18:05',
	cnt 		= 10,
	sellcnt = 0,
	img 		= '/upload/cover/1905/hong.jpg',
	summary = '아버지를 아버지라 부르지 못하고 형을 형이라 부르지 못하고';`;
	conn.query(sql, (err, result) => {
		if(err) console.log(err);
		else res.send(result);
	});
});
app.post("/admin/:method", (req, res) => {
	var method = req.params.method;
	if(method == "in") {
		var title = req.body.title;
		var author = req.body.author;
		var price = req.body.price;
		var isbn = req.body.isbn_0 + '-' + req.body.isbn_1 + '-' + req.body.isbn_2;
		var sdate = req.body.sdate;
		var cnt = req.body.cnt;
		var wdate = localDate();
		var summary = req.body.summary;
		/*
		var sql = `
		INSERT INTO book SET 
		title='${title}', author='${author}',
		price='${price}', isbn='${isbn}',
		sdate='2019-05-21', wdate='${wdate}',
		cnt='${cnt}', sellcnt='0', img='',
		summary='${summary}'`;
		*/
		var sql = " INSERT INTO book SET title=?, author=?, price=?, isbn=?, sdate=?, cnt=?, sellcnt=?, wdate=?, img=?, summary=? ";
		var values = [title, author, price, isbn, sdate, cnt, 0, wdate, '', summary];
		conn.query(sql, values, (err, result) => {
			if(err) {
				res.send("에러");
				console.log(err);
			}
			else {
				res.redirect("/book");
			}
		});
	}
});

function zp(n) {
	if(n < 10) return "0" + n;
	else return n;
}
function localDate(val) {
	var d = null;
	var dt = '';
	if(val === undefined) d = new Date();
	else if(typeof val == "number") d = new Date(val);
	else return 0;
	dt += d.getFullYear() + '-';
	dt += zp(d.getMonth() + 1) + '-';
	dt += zp(d.getDate()) + ' ';
	dt += zp(d.getHours()) + ':';
	dt += zp(d.getMinutes()) + ':';
	dt += zp(d.getSeconds());
	return dt;
}
//conn.end();