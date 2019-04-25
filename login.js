/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

(function() {
	
	window.onload = function() {
		document.getElementById("login").onclick = login;
		document.getElementById("register").onclick = gotoRegister;
	}
	
	function gotoRegister() {
		console.log("gotoRegister");

		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
		
		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;
		const query = "?command=gotoRegister";

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/register';
				} else {
					console.log("username or password is incorrect, or username does not exist");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	function login() {
		const user = document.getElementById("username").value;
		const pw = document.getElementById("password").value;

		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
		
		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;
		const query = "?command=login&username=" + user + "&password=" + pw;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/menu?username=' + user;
				} else {
					console.log("username or password is incorrect, or username does not exist");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		} else if (response.status == 404) {
			return Promise.reject(new Error("cannot find page!"));
		} else {
			return Promise.reject(new Error(response.status + ": " + response.statusText));
		}
	}
})();