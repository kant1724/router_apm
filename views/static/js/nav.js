function getNav1() {
	var filePath = '/views/static/res/nav/nav1'
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", filePath, false);
			xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;
	
	return fileContent;
}

function getNav2() {
	var filePath = '/views/static/res/nav/nav2'
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", filePath, false);
			xmlhttp.send(null);
	var fileContent = xmlhttp.responseText;

	return fileContent;
}
