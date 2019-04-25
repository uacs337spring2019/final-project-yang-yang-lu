/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

(function() {
	
	window.onload = function() {
		document.getElementById("register").onclick = register;
	}
	
	function register() {
		const user = document.getElementById("username").value;
		const pw = document.getElementById("password").value;
		
		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;

		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		console.log("serverUrl = " + url);

		const message = {
			command : "register",
			username : user,
			password : pw
		};

		const fetchOptions = {
			method : 'POST',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(message)
		};

		console.log("client query message = " + message);

		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/login';
				} else {
					console.log("invalid access");
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