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
	$('#sidenav-main').append(getNav1());
});

function callApi() {
	ajax('/', {"" : ""}, '', 'POST');
}
