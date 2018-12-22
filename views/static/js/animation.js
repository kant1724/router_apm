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

}
