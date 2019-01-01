function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method,
        data: input_data,
        async: true,
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

var socket = io.connect('http://14.63.168.58:8011');

socket.on('dataFromServer', function (data) {
	var res = data['res'];
  if (res == "") {
  } else {
    selectLogListCallback(data);
  }
	startSocketTrns();
});

function startSocketTrns() {
	setTimeout(function() {
    socket.emit('dataFromClient', {});
	}, 1000);
}

function activateTotalStatusIcon() {
	setInterval(function() {
		var cur = $('.total-status-icon').css('color');
		console.log(cur);
		if (cur == 'rgb(0, 128, 0)') {
			$('.total-status-icon').css('color', '#C4B73B');
		} else {
			$('.total-status-icon').css('color', 'green');
		}
	}, 500);
}

$(document).ready(function() {
	$('#sidenav-main').append(getNav1());
	$(".button-collapse").sideNav();

	$('#router_1').click(function() {
		$('#modalRelatedContent').modal();
	});

	startMonitoring();
//	activateTotalStatusIcon();
});

var intervalName;
function startMonitoring() {
	ajax('/soketStart', '', '', 'POST');
	startSocketTrns();
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
	$('#current_time').text(getCurrentTime());
	if (d.length == 0) return;
	var log = d[0].log;
	var re = /<[0-2][0-9][0-9]>/g;
	var num = log.match(re);
	if (num != null) {
		num = Number(num.substring(1, 4));
		var facility = num >> 3;
		var status = num - facility;
	}
	console.log(num);
	if (d[0].log == "ok") {
		$('#router_1').css('background', 'green');
		$('#error_router_cnt').text(0);
		$('#error_occur_rate').text(0);
	} else {
		$('#router_1').css('background', 'red');
		$('#error_router_cnt').text(1);
		$('#error_occur_rate').text(50);
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

function getCurrentTime() {
	var cur = moment().format();
	return cur.substring(0, 10) + ' ' + cur.substring(11, 19);
}
