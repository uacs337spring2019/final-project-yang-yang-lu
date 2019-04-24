/*
Name: Yang Yang Lu
Section: CSC337 001
HW description:
file descriiption:
*/

"use strict";

(function() {
	
	window.onload = function() {
		initialize();
		document.getElementById("back").onclick = goBack;
	}
	
	function initialize(){
		console.log("summary initialize");
		
		// ask for the current url to run query with
		const url = window.location.protocol + "//" + window.location.hostname + window.location.pathname;

		// const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;

		const user = window.location.href.split("?")[1];

		const query = "?command=summaryInit&" + user;

		console.log("client query = " + query);

		console.log("serverUrl = " + url);

		fetch(url + query)
			.then(checkStatus)
			.then(function(responseText) {
				console.log("responseText = " + responseText);
				if (responseText == "failure"){
					console.log("invalid access");
				} else {
					// loop through responseText to get data to be displayed
					var result = JSON.parse(responseText);
					console.log(result);
					var total = 0;
					result.forEach(entry => {
						total += entry.amount;
					});
					console.log("total = " + total);
					
					document.getElementById("totalexpense").textContent = "$" + total;
					
					var arr = [];
					
					result.forEach(entry => {
						if (arr[entry.categories] == undefined){
							arr[entry.categories] = entry.amount;
						} else {
							arr[entry.categories] += entry.amount;
						}
					});
					
					console.log(arr);
					
					var percent = [];
					
					for(var idx in arr){
						console.log(idx);
						var y = arr[idx]/total*100;
						percent.push({y: y, label: idx});
					}
					
					console.log(percent);
					
					var chart = new CanvasJS.Chart("piechart", {
						animationEnabled: true,
						title: {
							text: "Expense Categories"
						},
						data: [{
							type: "pie",
							startAngle: 240,
							yValueFormatString: "##0.00\"%\"",
							indexLabel: "{label} {y}",
							dataPoints: percent
						}]
					});
					
					chart.render();
					
					var dateArr = [];
					
					result.forEach(entry => {
						var curDate = new Date(entry.date);
						console.log(curDate.getMonth());
						if (dateArr[curDate.getMonth()] == undefined){
							dateArr[curDate.getMonth()] = entry.amount;
						} else {
							dateArr[curDate.getMonth()] += entry.amount;
						}
					});
					
					console.log(dateArr);
					
					var monthly = [];
					var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					
					for (var i = 0; i < 12; i++) {
						var y;
						if (dateArr[i] == undefined){
							y = 0;
						} else {
							y = dateArr[i];
						}
						monthly.push({y: y, label: month[i]});
					}
					
					console.log(monthly);
					
					var chart = new CanvasJS.Chart("barchart", {
						animationEnabled: true,
						theme: "light2", // "light1", "light2", "dark1", "dark2"
						title:{
							text: "Monthly Expense Total"
						},
						axisY: {
							title: "Amount($)"
						},
						axisX: {
							title: "Months"
						},
						data: [{        
							type: "column",
							dataPoints: monthly
						}]
					});
					chart.render();
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