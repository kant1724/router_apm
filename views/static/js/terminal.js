var socket = io.connect('http://127.0.0.1:8011');

function startSocketTrns() {
  $('#current_time').text(getCurrentTime());

  if ($("#chkLogLock").is(":checked") == true) {
    // 로그 중단. 1초 후 재확인
    setTimeout(function() {
      startSocketTrns();
    }, 1000);
  } else {
    // 1초후 로그 가지고 오기.
    setTimeout(function() {
      socket.emit('dataFromClient', {});
    }, 1000);
  }
}

var gvTerminalLogs = []; // 로그 데이터 바인드셋
var gvLogsMaxRow = 200; // 보관 max row 수
function fnPutGvTerminalLogs(d) {
  if (gvTerminalLogs.length > gvLogsMaxRow) {
    gvTerminalLogs.shift(gvLogsMaxRow - d.length);
  }
  gvTerminalLogs.push(d);
  $("#jsGrid").jsGrid("loadData");
}

function fnClearGvTerminalLogs() {
  gvTerminalLogs = [];
  $("#jsGrid").jsGrid("loadData");
}

socket.on('dataFromServer', function(data) {
  selectLogListCallback(data);
});

function selectLogListCallback(data) {
  var res = data.res;
  if (typeof res != "undefined" && res != "") {
    var d = JSON.parse(res);
    if (d != null) {
			if ( gvLogsMaxRow != $("#txtMaxLine").val() ) {
				gvLogsMaxRow = $("#txtMaxLine").val();
				console.log(gvLogsMaxRow);
				if ( gvLogsMaxRow == "" ) gvLogsMaxRow = 200;
				console.log(gvLogsMaxRow);
			}

      fnPutGvTerminalLogs(d);

      //console.log(vScrollObj.scroll()[0]);
      //vScrollObj.animate({scrollTop : vScrollObj.offset().top}, 400);
      //console.log($("#jsGrid").scrollTop());
      //console.log(vScrollObj.scrollTop());
      //console.log(vScrollObj.scroll()[0].scrollHeight);
      //console.log($("#chkScrollLock").is(":checked"));

			var vScrollObj = $(".jsgrid-grid-body");
      if ($("#chkScrollLock").is(":checked") == false) {
        vScrollObj.scrollTop(vScrollObj.scroll()[0].scrollHeight);
      }
    }
    startSocketTrns();
  }
}

function startMonitoring() {
  ajax('/socketStart', '', '', 'POST');
  startSocketTrns();
}

$(document).ready(function() {
  $('#sidenav-main').append(getNav1());
  $(".button-collapse").sideNav();

  startMonitoring();

  $("#btnClear").on("click", function() {
    fnClearGvTerminalLogs();
  });

  $("#jsGrid").jsGrid({
    height: "100%",
    width: "100%",

    sorting: false,
    paging: false,

    filtering: true,
    autoload: true,

    data: gvTerminalLogs,

    controller: {
      loadData: function(filter) {
        return $.grep(gvTerminalLogs, function(client) {
          return (!filter.ip || client.ip === filter.ip) &&
            (!filter.today || client.today.indexOf(filter.today) > -1) &&
            (!filter.log || client.log.indexOf(filter.log) > -1);
        });
      },

      insertItem: function(insertingClient) {
        //this.clients.push(insertingClient);
        console.log("insertItem");

      },

      updateItem: function(updatingClient) {
        console.log("updateItem");
      },

      deleteItem: function(deletingClient) {
        console.log("deleteItem");
        //var clientIndex = $.inArray(deletingClient, this.clients);
        //this.clients.splice(clientIndex, 1);
      }
    },
    fields: [{
        name: "ip",
        type: "text",
        width: 30
      },
      {
        name: "today",
        type: "text",
        width: 30
      },
      {
        name: "log",
        type: "text",
        width: 200,
        title: "Log"
      }
    ]
  });
});

function ajax(url, input_data, gubun, method) {
  $.ajax(url, {
    type: method,
    data: input_data,
    async: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    success: function(data, status, xhr) {
      if (gubun == "selectLogList") {
        selectLogListCallback(data);
      }
    },
    error: function(jqXhr, textStatus, errorMessage) {
      if (jqXhr.status == 404) {
        alert(textStatus);
      }
    }
  });
}

function getCurrentTime() {
  var cur = moment().format();
  return cur.substring(0, 10) + ' ' + cur.substring(11, 19);
}
