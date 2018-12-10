function getNav1() {
	var filePath = '/views/static/res/html_common/nav/nav1.html'
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", filePath, false);
			xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;

	return fileContent;
}

function getNav2() {
	var filePath = '/views/static/res/html_common/nav/nav2.html'
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", filePath, false);
			xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;

	return fileContent;
}
