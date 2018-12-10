function getNav1() {
	var filePath = '/views/templates/common/nav/nav1.html'
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;

	return fileContent;
}

function getNav2() {
	var filePath = '/views/templates/common/nav/nav2.html'
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;

	return fileContent;
}
