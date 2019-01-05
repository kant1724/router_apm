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

var socket = io.connect('http://127.0.0.1:8011');

socket.on('dataFromServer', function (data) {
	var res = data['res'];
  if (res == "") {
		console.log("no return");
		startSocketTrns();
  } else {
    selectLogListCallback(data);
  }
});

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
});

function startMonitoring() {
	ajax('/soketStart', '', '', 'POST');
	startSocketTrns();
}

function startSocketTrns() {
  socket.emit('dataFromClient', {});
}

var statusColor = {
	0 : 'gray',
	1 : '#FFC19E',
	2 : '#99004C',
	3 : 'red',
	4 : '#FAED7D',
	5 : '#B2CCFF',
  6 : '#FFD9EC',
	7 : 'green'
};

var statusName = {
	0 : 'Emergency',
	1 : 'Alert',
	2 : 'Critical',
	3 : 'Error',
	4 : 'Warning',
	5 : 'Notice',
  6 : 'Informational',
	7 : 'Debug'
}

function selectLogListCallback(data) {
	var res = data['res'];
	var d = JSON.parse(res);
	$('#current_time').text(getCurrentTime());
	if (d == null) {
			startSocketTrns();
			return;
	};
	setStatus(d);
	setInterval(function() {
		startSocketTrns();
	}, 1000);
}

function setStatus(d) {
	var log = d.log;
	var re = /<[0-2][0-9][0-9]>/g;
	var num = log.match(re)[0];
	if (num != null) {
		num = Number(num.substring(1, 4));
		var facility = num >> 3;
		var status = num - (facility << 3);
	}
	var color = statusColor[status];
	var name = statusName[status];
	$('#router_1').css('background', color);
	$('#error_router_cnt').text(0);
	$('#error_occur_rate').text(0);
	$('#status').text(name);

	var obj = $('#log_list_row').children();
	if (obj.length >= 5) {
		$(obj[0]).remove();
	}
	var html = '<div class="col-7">';
			html += d.ip + ' ';
			html += d.date + ' ';
			html += d.hour + ':' + d.minute + ':' + d.seconds + ' ';
			html += d.log;
			html += '</div>';
	$('#log_list_row').append(html);
}

function getCurrentTime() {
	var cur = moment().format();
	return cur.substring(0, 10) + ' ' + cur.substring(11, 19);
}
