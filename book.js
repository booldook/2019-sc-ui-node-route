// 서버구축
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./module/mysql_pool");
const pager = require("./module/pager");
const util = require("./module/util");
const mt = require('./module/multer_fn');
const mysql = db.mysql;
const conn = db.conn;

// multer 초기설정
const upload = mt.multer({
	storage: mt.storage, 
	fileFilter: mt.chkImgExt
});

// pager 초기설정
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
app.use("/", express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// ROUTER
// 도서 리스트
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
							//for(let i in result) result[i].price = util.vComma(result[i].price)+"원";
							for(var i in result) {
								if(result[i].img != "" && result[i].img != null) result[i].img = '/uploads/'+result[i].img.substr(0, 4)+'/'+result[i].img;
								else result[i].img = '/img/noimage.gif';
							}
							var vals = {
								cssName: "book",
								jsName: "book",
								smTit: "도서 목록 리스트",
								items: result,
								pages
							}
							connect.release();
							res.render('book_list', vals);
							//res.send(vals);
						}
					});
				});
			}
		});
	});
});

// 도서 등록 및 수정
app.post("/admin/:method", upload.single("img"), (req, res) => {
	var method = req.params.method;
	var id = req.body.id;
	var title = req.body.title;
	var author = req.body.author;
	var price = req.body.price;
	var isbn = req.body.isbn_0 + '-' + req.body.isbn_1 + '-' + req.body.isbn_2;
	var sdate = req.body.sdate;
	var cnt = req.body.cnt;
	var wdate = util.localDate();
	var summary = req.body.summary;
	if(req.file != undefined) {
		var values = [title, author, price, isbn, sdate, cnt, 0, wdate, req.file.filename, req.file.originalname, summary];
		var sqlVal = " title=?, author=?, price=?, isbn=?, sdate=?, cnt=?, sellcnt=?, wdate=?, img=?, imgname=?, summary=? "; 
	}
	else {
		var values = [title, author, price, isbn, sdate, cnt, 0, wdate, summary];
		var sqlVal = " title=?, author=?, price=?, isbn=?, sdate=?, cnt=?, sellcnt=?, wdate=?, summary=? "; 
	}
	var sql = '';
	if(method == "in") sql = " INSERT INTO book SET " + sqlVal;
	else if(method == "up") sql = " UPDATE book SET " + sqlVal + " WHERE id="+id;
	conn.getConnection((err, connect) => {
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
});

// 도서상세보기 - modal
app.get("/detail/:id", (req, res) => {
	var id = req.params.id;
	conn.getConnection((err, connect) => {
		var sql = ` SELECT * FROM book WHERE id=${id} `;
		connect.query(sql, (err, result) => {
			if(err) {
				connect.release();
				console.log(err);
			}
			else {
				connect.release();
				res.send(result[0]);
			}
		});
	});
});

// 도서 삭제
app.get("/remove/:id", (req, res) => {
	var id = req.params.id;
	conn.getConnection((err, connect) => {
		var sql = ` DELETE FROM book WHERE id='${id}' `;
		connect.query(sql, (err, result) => {
			if(err) {
				connect.release();
				console.log(err);
			}
			else {
				connect.release();
				res.redirect("/book");
			}
		});
	});
});

// 도서 수정 UI
app.get("/update/:id", (req, res) => {
	var id = req.params.id;
	conn.getConnection((err, connect) => {
		var sql = ` SELECT * FROM book WHERE id='${id}' `;
		connect.query(sql, (err, result) => {
			if(result[0].img != "" && result[0].img != null) result[0].img = '/uploads/'+result[0].img.substr(0, 4)+'/'+result[0].img;
			if(err) {
				connect.release();
				console.log(err);
			}
			else {
				var vals = {
					cssName: "book_in",
					jsName: "book_in",
					smTit: "도서 정보 수정",
					rs: result[0]
				}
				vals.rs.isbn = vals.rs.isbn.split("-");
				res.render('book_update', vals);
				//res.send(vals);
			}
		});
	});
});