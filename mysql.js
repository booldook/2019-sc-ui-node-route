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

