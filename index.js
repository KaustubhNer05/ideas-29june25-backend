const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
	host: process.env.db_host,
	user: process.env.db_user,
	password: process.env.db_password,
	database: process.env.db_name
});

app.post("/add", (req, res) => {
	let sql = "insert into ideas (title, description) values (?, ?)";
	let data = [req.body.title, req.body.description];
	con.query(sql, data, (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.get("/ideas", (req, res) => {
	let sql = "select * from ideas order by votes desc, created_at desc";
	con.query(sql, (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.put("/upvote", (req, res) => {
	let sql = "update ideas set votes = votes + 1 where id = ?";
	con.query(sql, [req.body.id], (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.put("/update", (req, res) => {
	let sql = "update ideas set title = ?, description = ? where id = ?";
	let data = [req.body.title, req.body.description, req.body.id];
	con.query(sql, data, (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.delete("/delete", (req, res) => {
	let sql = "delete from ideas where id = ?";
	con.query(sql, [req.body.id], (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.listen(9000, () => console.log("Server ready @ 9000"));
