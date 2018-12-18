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

	selectLogList();
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
