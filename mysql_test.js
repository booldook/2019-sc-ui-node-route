const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./module/mysql_conn");
const mysql = db.mysql;
const conn = db.conn;
const fns = require("./module/test");
fns.fn("테스트");
fns.fn2("테스트");


app.get("/test/", (req, res) => {
	/*
	var sql = " INSERT INTO book SET title=?, author=?, price=?, isbn=?, sdate=?, wdate=?, cnt=?, sellcnt=?, summary=?, img=? ";
	var vals = ['별주부전', '거북이', '20000', '12-3456-7890', '2019-05-21', '2019-05-21 09:11:11', 0, 0, '거북이가 용왕을...', ''];

	var sql = `
	INSERT INTO book SET 
	title='${title}', author='${author}',
	price='${price}', isbn='${isbn}',
	sdate='2019-05-21', wdate='${wdate}',
	cnt='${cnt}', sellcnt='0', img='',
	summary='${summary}'`;
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