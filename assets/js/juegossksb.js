function onModal(oEvent) {
	console.log(oEvent);
	var json = getJSON("./json/data.json");
	json = JSON.parse(json);
	console.log(json);
	var img, medidas, descri, limedidas, lidescri;
	img = document.getElementById("idImgModal");
	medidas = document.getElementById("idUlMedida");
	descri = document.getElementById("idUlDescripcion");
	$.each(json, function(k , v){
		if(v.id == oEvent.id){
			img.setAttribute("src", v.assets);
			document.getElementById(oEvent.id).href = "#modal";
			document.getElementById("idTitulo").innerHTML = v.titulo;

			if(medidas.children.length > 0){
				$.each(medidas.children, function(kme, vme){
					medidas.removeChild(medidas.children[0])
				});
			}

			if(descri.children.length > 0){
				$.each(descri.children, function(kde, vde){
					descri.removeChild(descri.children[0])
				});	
			}

			$.each(v.medidas, function(km, vm){
				limedidas = document.createElement("li");
				limedidas.innerHTML = vm.texto;
				medidas.appendChild(limedidas);
			});
			$.each(v.descripciones, function(kd, vd){
				lidescri = document.createElement("li");
				lidescri.innerHTML = vd.texto;
				descri.appendChild(lidescri);
			});
		}
	});
}	

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

function createE() {

	var json = getJSON("./json/data.json");
	json = JSON.parse(json);
	console.log(json);
	var random, bgcolor, borcolor;
	$.each(json, function(k , v){
		
		random = Math.floor(Math.random() * 6)+1;
		bgcolor = "bg-color-" + random;
		borcolor = "border-color-" + random;

		var div = document.createElement("div");
		div.classList.add("col-md-3");
		div.classList.add("col-xs-6");

		var div2 = document.createElement("div");
		div2.classList.add("box");
		div2.classList.add(bgcolor);

		var div3 = document.createElement("div");
		div3.classList.add("box-img");
		div3.classList.add(borcolor);
		div3.classList.add("text-center");


		/*=======================*/

		var a = document.createElement("a");
		var img = document.createElement("img");
		img.classList.add("img-responsive");
		img.setAttribute("alt", "image");
		img.setAttribute("src", v.assets);
		
		var aclick = document.createElement("a");
		aclick.setAttribute("onclick", "onModal(this)");
		// aclick.addEventListener("click", onModal(this));
		aclick.setAttribute("href", "");
		aclick.setAttribute("data-toggle", "modal");
		aclick.setAttribute("id", v.id);
		aclick.classList.add("btn-block")
		var i = document.createElement("i");
		i.setAttribute("aria-hidden", "true");
		i.classList.add("fa");
		i.classList.add("fa-eye");
		aclick.innerHTML = "Previsualizar ";
		var div3$1 = document.createElement("div");
		div3$1.classList.add("box-info");
		var h4 = document.createElement("h4");
		h4.innerHTML = v.titulo;

		div3$1.appendChild(h4);

		aclick.appendChild(i);
		a.appendChild(img);

		div3.appendChild(a);
		div3.appendChild(aclick);


		/*=======================*/

		div2.appendChild(div3);
		div2.appendChild(div3$1);
		div.appendChild(div2);

		document.getElementById("idRow").appendChild(div);


	});
	
}

createE();