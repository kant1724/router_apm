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

	$('#router_1').click(function() {
		$('#modalRelatedContent').modal();
	});

	startMonitoring();
});

var intervalName;
function startMonitoring() {
	var date = new Date();
	intervalName = setInterval(function()
	{
		console.log(date);
		selectLogList(date);
		date = new Date();
	}, 500);
}

function stopMonitoring() {
	clearInterval(intervalName);
}

function selectLogList(date) {
	var seconds = date.getSeconds();
	ajax('/selectLogListAfterSeconds', {"seconds" : seconds}, 'selectLogList', 'POST');
}

function selectLogListCallback(data) {
	var res = data['res'];
	var d = JSON.parse(res);
	if (d[0].log == "ok") {
		$('#router_1').css('background', 'green');
	} else {
		$('#router_1').css('background', 'red');
	}
	var obj = $('#log_list_row').children();
	if (obj.length >= 5) {
		$(obj[0]).remove();
	}
	var html = '<div class="col-7">';
	 	  html += d[0].ip + ' ';
			html += d[0].date + ' ';
			html += d[0].hour + ':' + d[0].minute + ':' + d[0].seconds + ' ';
			html += d[0].log;
			html += '</div>';
	$('#log_list_row').append(html);
}
