/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

// use module
(function() {
	// require express
	const express = require("express");
	const app = express();
	
	// require fs
	const fs = require("fs");
	
	// require body-parser
	const bodyParser = require("body-parser");
	const jsonParser = bodyParser.json();
	
	// set custom parameter
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	
	// var secretFile = fs.readFileSync('secret.json');
	// var secret = JSON.parse(secretFile);

	// // require mysql
	// const mysql = require("mysql");

	// var con = mysql.createConnection({
		// host: secret.hostname,
		// user: secret.username,
		// password: secret.password,
		// database: secret.database
	// });

	// // check connection
	// con.connect(function(err) {
		// if (err) throw err;
		// console.log("Connected!");
	// });
	
	// use public so localhost works
	app.use(express.static(__dirname));
	
	app.get('/', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("login page " + JSON.stringify(req.query));
		res.redirect("/login");
	});
	
	app.get('/login', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("login page" + JSON.stringify(req.query));
		
		const command = req.query.command;
		
		switch(command){
			case "login": {
				const password = req.query.password;
				if (password == "password"){
					res.send("success");
				} else {
					res.send("failure");
				}
				break;
			}
			default: {
				res.sendFile(__dirname + "/login.html");
				break;
			}
		}
	});
	
	app.get('/menu', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("menu page " + JSON.stringify(req.query));
		
		const command = req.query.command;
		
		switch(command){
			case "addExpense": {
				res.send("success");
				break;
			}
			case "summary": {
				res.send("success");
				break;
			}
			case "alert": {
				res.send("success");
				break;
			}
			default: {
				res.sendFile(__dirname + "/menu.html");
				break;
			}
		}
	});
	
	app.get('/menu/addExpense', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("addExpense page " + JSON.stringify(req.query));
		
		const command = req.query.command;
		
		switch(command){
			case "menu": {
				res.send("success");
				break;
			}
			default: {
				res.sendFile(__dirname + "/expense.html");
				break;
			}
		}
	});
	
	app.get('/menu/summary', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("summary page " + JSON.stringify(req.query));
		
		const command = req.query.command;
		
		switch(command){
			case "menu": {
				res.send("success");
				break;
			}
			default: {
				res.sendFile(__dirname + "/summary.html");
				break;
			}
		}
	});
	
	app.get('/menu/alert', function(req, res){
		res.header("Access-Control-Allow-Origin", "*");
		console.log("alert page " + JSON.stringify(req.query));
		
		const command = req.query.command;
		
		switch(command){
			case "menu": {
				res.send("success");
				break;
			}
			default: {
				res.sendFile(__dirname + "/alert.html");
				break;
			}
		}
		
	});
	
	app.listen(process.env.PORT);
})();