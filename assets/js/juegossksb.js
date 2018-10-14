function onModal(oEvent) {
	
	var json = getJSON("./json/data.json");
	json = JSON.parse(json);
	console.log(json);
	$.each(json, function(k , v){
		if(v.id == oEvent.id){
			document.getElementById(oEvent.id).href = "#tobogan";
			document.getElementById("idTitulo").innerHTML = v.titulo;
		}
	});
}	

 function getJSON(url) {
    var resp ;
    var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp ;
}