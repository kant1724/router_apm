function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method,
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
					if (gubun == "selectLogList") {
						selectLogListCallback(data);
					}
        },
        error: function (jqXhr, textStatus, errorMessage) {
        	if(jqXhr.status==404) {
        		alert(textStatus);
          }
        }
    });
}

$(document).ready(function() {
	$('#sidenav-main').append(getNav1());
	$(".button-collapse").sideNav();

	var ctxL = document.getElementById("lineChart").getContext('2d');
	
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
		 labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05", "12:06"],
		 datasets: [{
				 label: "상태값",
				 data: [1, 5, 4, 7, 0, 3, 4],
				 backgroundColor: [
					 'transparent',
				 ],
				 borderColor: [
					 'rgba(200, 99, 132, .7)',
				 ],
				 borderWidth: 2,
				 lineTension: 0
			 }
		 ]
		},
		options: {
	  }
	});
});

function selectLogList() {
	ajax('/selectLogList', {"" : ""}, 'selectLogList', 'POST');
}

function selectLogListCallback(data) {
	var res = data['res'];
	var d = JSON.parse(res);
	var html = "";
	for (var i = 0; i < d.length; ++i) {
			if (d[i].ip != null) {
				html += '<tr>';
				html += '<td><a>' + d[i].date + '</a></td>';
				html += '<td><a>' + d[i].time + '</a></td>';
				html += '<td><a>' + d[i].ip + '</a></td>';
				html += '<td><a>' + d[i].log + '</a></td>';
				html += '</tr>';
			}
	}
	$('#log_tbody').append(html);
}
