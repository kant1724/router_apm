function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method,
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
        },
        error: function (jqXhr, textStatus, errorMessage) {
        	if(jqXhr.status==404) {
        		alert(textStatus);
            }
        }
    });
}

$(document).ready(function() {
	var nav1 = getNav1();
	var nav2 = getNav2();
	$('#sidenav-main').append(nav1);
	$('#navbar-main').append(nav2);
});

function callApi() {
	ajax('/', {"" : ""}, '', 'POST');
}
