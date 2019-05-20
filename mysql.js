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
conn.connect();

// ROUTER
app.get("/book/:id", (req, res) => {

});
app.post("/admin/:method", (req, res) => {
	var method = req.params.method;
	if(method == "in") {
		res.send("POST방식으로 잘 받았습니다. (" + req.body.title + ")");
	}
});