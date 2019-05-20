// 서버구축
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./mysql_conn');
const mysql = db.mysql;
const conn = db.conn;

// 서버실행
app.listen(3000, () => {
	console.log("Connected at 3000 port http://127.0.0.1:3000");
});

// 초기설정
app.locals.pretty = true;
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// ROUTER
app.get("/book/:id", (req, res) => {

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
		var sql = " INSERT INTO book SET title=?, author=?, price=?, isbn=?, sdate=?, cnt=?, sellcnt=?, wdate=?, img=?, summary=? ";
		var values = [title, author, price, isbn, '2019-01-11', cnt, 0, wdate, '', summary];
		conn.connect();
		conn.query(sql, values, (err, row, field) => {
			if(err) {
				res.send("에러");
				console.log(err);
			}
			else {
				res.send(row);
			}
			conn.end();
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