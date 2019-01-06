var gvTerminalLogs = [];
var gvLogsMaxRow = 10;
var socket = io.connect('http://127.0.0.1:8011');

function startSocketTrns() {
	setTimeout(function() {
		socket.emit('dataFromClient', {});
	}, 1000);
}

socket.on('dataFromServer', function (data) {
  selectLogListCallback(data);
});

function selectLogListCallback(data) {
	$('#current_time').text(getCurrentTime());
	var res = data['res'];

	if ( res != "" ) {
		var d = JSON.parse(res);
		if ( d != null ) {
			if ( gvTerminalLogs.length >= gvLogsMaxRow ) {
				gvTerminalLogs.shift(d.length);
			}
			gvTerminalLogs.push(d);
			//console.log(gvTerminalLogs);
			$("#jsGrid").jsGrid("option", "data", gvTerminalLogs);
		}
	}

	startSocketTrns();
}


$(document).ready(function() {
	$('#sidenav-main').append(getNav1());
	$(".button-collapse").sideNav();

	startMonitoring();

  $("#jsGrid").jsGrid({
      height: "600px",
      width: "100%",

      sorting: true,
      paging: false,

      data: gvTerminalLogs,

      fields: [
          { name: "ip", type: "text", width: 30 },
          { name: "today", type: "text", width: 30 },
          { name: "log", type: "text", width: 200,  title: "Is log"  }
      ]
  });
});

function startMonitoring() {
	ajax('/socketStart', '', '', 'POST');
	startSocketTrns();
}


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

function getCurrentTime() {
	var cur = moment().format();
	return cur.substring(0, 10) + ' ' + cur.substring(11, 19);
}
