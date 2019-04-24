/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

(function() {
	
	window.onload = function() {
		document.getElementById("back").onclick = goBack;
		document.getElementById("submit").onclick = submit;
	}
	
	function submit() {
		console.log("expense submit");
		
		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;

		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1].split("=")[1];

		console.log("serverUrl = " + url);
		console.log("date = " + document.getElementById("date").value);

		const message = {
			command : "addExpense",
			username : user,
			amount: document.getElementById("amount").value,
			date: document.getElementById("date").value,
			categories: document.getElementById("categories").value,
			location: document.getElementById("location").value,
			notes: document.getElementById("notes").value
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
					
				} else {
					console.log("invalid access");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	function goBack() {
		console.log("goBack");
		
		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;

		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1];

		const query = "?command=menu&" + user;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/menu?' + user;
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