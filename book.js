// 서버구축
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./module/mysql_pool");
const pager = require("./module/pager");
const util = require("./module/util");
const mysql = db.mysql;
const conn = db.conn;

const pageCnt = pager.pageCnt;
const pageDiv = pager.pageDiv;

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

// ROUTER
app.get(["/book", "/book/:page"], (req, res) => {
	var rows = 0;				// 총 데이터 갯수
	var pageTotal = 0;	// 총 페이지 수
	var page = req.params.page;
	if(page === undefined) page = 1;
	var pageStart = (page - 1) * pageCnt;		// sql LIMIT 의 첫번째 인자(시작 레코드 번호)
	conn.getConnection((err, connect) => {
		var sql = " SELECT count(id) AS cnt FROM book ";
		connect.query(sql, (err, result, field) => {
			if(err) {
				connect.release();
				res.send("에러");
			}
			else {
				rows = result[0].cnt;
				pageTotal = Math.ceil(rows/pageCnt);
				connect.release();
				conn.getConnection((err, connect) => {
					var sql = ` SELECT * FROM book ORDER BY id DESC LIMIT ${pageStart}, ${pageCnt} `;
					connect.query(sql, (err, result, field) => {
						if(err) {
							connect.release();
							res.send("에러");
						}
						else {
							var pages = pager.pagerCreate(page, pageTotal); 
							var vals = {
								cssName: "book",
								jsName: "book",
								smTit: "도서 목록 리스트",
								items: result,
								pages
							}
							connect.release();
							res.render('book_list', vals);
						}
					});
				});
			}
		});
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
		var wdate = util.localDate();
		var summary = req.body.summary;
		conn.getConnection((err, connect) => {
			var sql = " INSERT INTO book SET title=?, author=?, price=?, isbn=?, sdate=?, cnt=?, sellcnt=?, wdate=?, img=?, summary=? ";
			var values = [title, author, price, isbn, sdate, cnt, 0, wdate, '', summary];
			connect.query(sql, values, (err, result) => {
				if(err) {
					connect.release();
					res.send("에러");
				}
				else {
					connect.release();
					res.redirect("/book");
				}
			});
		});
	}
});