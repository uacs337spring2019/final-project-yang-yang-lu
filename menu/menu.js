/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

(function() {
	
	window.onload = function() {
		console.log("script running");
		document.getElementById("addexpense").onclick = gotoAddExpense;
		document.getElementById("summary").onclick = gotoSummary;
		document.getElementById("alert").onclick = gotoAlert;
	}
	
	function gotoAddExpense() {
		console.log("gotoAddExpense");
		// ask for the current url to run query with
		const url = "http://" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1];

		const query = "?command=addExpense&" + user;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/menu/addExpense?' + user;
				} else {
					console.log("invalid access");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	function gotoSummary() {
		console.log("gotoSummary");
		// ask for the current url to run query with
		const url = "http://" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1];

		const query = "?command=summary&" + user;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/menu/summary?' + user;
				} else {
					console.log("invalid access");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	function gotoAlert() {
		console.log("gotoAlert");
		
		// ask for the current url to run query with
		const url = "http://" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1];

		const query = "?command=alert&" + user;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "success"){
					window.location.href = '/menu/alert?' + user;
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