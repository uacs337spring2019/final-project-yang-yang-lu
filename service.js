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

	// require mysql
	const mysql = require("mysql");

	// var pool = mysql.createPool({
		// host: secret.hostname,
		// user: secret.username,
		// password: secret.password,
		// database: secret.database
	// });
	
	var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

	// connect with pool
	pool.getConnection(function(err, connection) {
		if (err) throw err;
		console.log("connected");
	});
	
	// set custom parameter
	app.use(function(req, res, next) { 
		res.header("Access-Control-Allow-Origin", "*"); 
		res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	// post to write to mysql
	app.post('/menu/addExpense', jsonParser, function(req, res) { 
		res.header("Access-Control-Allow-Origin", "*");
		console.log("req.body.command = " + req.body.command);
		console.log("req.body = " + JSON.stringify(req.body));

		const command = req.body.command;

		switch(command) {
			case "addExpense": {
				var username = req.body.username;
				
				var cols = "username, amount, date, categories, location, notes";
				
				var query = 'INSERT INTO expense ('
				+ cols + ')'
				+ 'VALUES (\''
				+ username + '\', ' + req.body.amount
				+ ', \'' + req.body.date + '\', \''
				+ req.body.categories + '\', \''
				+ req.body.location + '\', \''
				+ req.body.notes + '\')';
				
				// connect with pool
				pool.getConnection(function(err, connection) {
					if (err) throw err;
					console.log("connected");
					
					connection.query(query, function(err, result) {
						connection.release();
						if (err) {
							res.send("failure");
							throw err;
						}
						
						console.log("1 record inserted: " + query);
						res.send("success");
					});
				});
				
				break;
			}
			default: {
				console.log("invalid command");
				break;
			}
		}
	});

	// post to write to mysql
	app.post('/menu/alert', jsonParser, function(req, res) { 
		res.header("Access-Control-Allow-Origin", "*");
		console.log("req.body.command = " + req.body.command);
		console.log("req.body = " + JSON.stringify(req.body));

		const command = req.body.command;

		switch(command) {
			case "setLimit": {
				var username = req.body.username;
				
				var cols = "username, limit";
				
				var query = 'REPLACE INTO expense_limit VALUES (\''
				+ username + '\', ' + req.body.limit + ')';
				
				// connect with pool
				pool.getConnection(function(err, connection) {
					if (err) throw err;
					console.log("connected");
					
					connection.query(query, function(err, result) {
						connection.release();
						if (err) {
							res.send("failure");
							throw err;
						}
						
						console.log("1 record replaced: " + query);
						res.send("success");
					});
				});
				break;
			}
			default: {
				console.log("invalid command");
				break;
			}
		}
	});

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
				var username = req.query.username;
				const password = req.query.password;
				
				var query = 'SELECT * FROM user WHERE username = \'' + username + '\'';
				
				console.log("query = " + query);
				
				// connect with pool
				pool.getConnection(function(err, connection) {
					if (err) throw err;
					console.log("connected");
					
					connection.query(query, function(err, result, fields) {
						connection.release();
						if (err) throw err;
						console.log("result = " + result[0]);
						if (result[0] == undefined){
							res.send("failure");
							return;
						}
						console.log(result[0].password.length);
						console.log(password.length);
						if (result[0].password == password){
							res.send("success");
						} else {
							res.send("failure");
						}
					});
				});
				break;
			}
			case "summaryInit": {
				
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
			case "summaryInit": {
				var username = req.query.username;
				
				var query = 'SELECT * FROM expense WHERE username = \'' + username + '\'';
				
				console.log("query = " + query);
				
				// connect with pool
				pool.getConnection(function(err, connection) {
					if (err) throw err;
					console.log("connected");
					
					connection.query(query, function(err, result, fields) {
						connection.release();
						if (err) throw err;
						console.log("result: ");
						console.log(result);
						if (result[0] == undefined){
							res.send("failure");
							return;
						}
						res.send(JSON.stringify(result));
					});
				});
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
			case "getLimit": {
				var username = req.query.username;
				
				var query = 'SELECT * FROM expense_limit WHERE username = \'' + username + '\'';
				
				console.log("query = " + query);
				
				// connect with pool
				pool.getConnection(function(err, connection) {
					if (err) throw err;
					console.log("connected");
					
					connection.query(query, function(err, result, fields) {
						connection.release();
						if (err) throw err;
						console.log("result: ");
						console.log(result);
						if (result[0] == undefined){
							res.send("failure");
							return;
						}
						res.send(JSON.stringify(result[0]));
					});
				});
				break;
			}
			default: {
				res.sendFile(__dirname + "/alert.html");
				break;
			}
		}
		
	});
	
	app.listen(process.env.PORT);
	// app.listen(3000);
})();