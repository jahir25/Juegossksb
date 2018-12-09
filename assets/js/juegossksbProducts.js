function onInit(){

    /*============================================
                    TITLE DE LA PAGINA
    ============================================*/

    var urlGet = location.href;
    var index = urlGet.indexOf("?");
    var encrypted = urlGet.substr(index+1, urlGet.length);
    var decrypted = CryptoJS.AES.decrypt(encrypted, "P4ssW0rJu3g0sKs3.com").toString(CryptoJS.enc.Utf8);

    // console.log(decrypted);

    $.ajax({
        url: "./json/category.json",
        datatype: "json",
        success: function(result){
            $.each(result, function(k, v){
                if(v.ca_id == decrypted){
                    document.getElementById("idTitlePage").innerHTML = v.ca_name;
                    document.getElementById("idTitleh2").innerHTML = v.ca_name;
                    document.getElementById("idTitleli").innerHTML = v.ca_name;
                    getJson(v);                    
                }
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
        }
    });

}

function getJson(data){

    $.ajax({
        url: data.ca_json,
        datatype: "json",
        success: function(result){
            onCreateElement(data, result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
        }
    });
}

function verifiedUniq(array, item){
	var flag = true;
	

	$.each(array, function(k, v){
		if(v == item){
			flag = false;
			return false;
		}
	});

	if(flag){
		array.push(item);
	}
}

function onCreateElement(data, result){
	var cont = true, arraySub = [];

	if(data.ca_flag_cate){

		$.each(result, function(kc ,vc){
			verifiedUniq(arraySub, vc.category);
		});

		$.each(arraySub, function(ka, va){

			var divtitle = document.createElement("div");
			divtitle.classList.add("subcatalog");
			divtitle.classList.add("col-md-12");

			var h2 = document.createElement("h2");
			h2.innerHTML = va;
			divtitle.appendChild(h2);
			document.getElementById("idRow").appendChild(divtitle);

			$.each(result, function(k, v){
				
					if(va == v.category){
							/*ITEM SUB CATALOGO*/

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
							var encrypted = CryptoJS.AES.encrypt(data.ca_id + "/" + v.id, "P4ssW0rJu3g0sKs3.com");
							var a = document.createElement("a");
							a.setAttribute("href", "details.html?" + encrypted);
							var img = document.createElement("img");
							img.classList.add("img-responsive");
							img.setAttribute("alt", "image");
							img.setAttribute("src", v.assets);
							
							var aclick = document.createElement("a");
							// aclick.setAttribute("onclick", "onModal(this,titu)");
							// aclick.addEventListener("click", onModal(this));
							aclick.setAttribute("href", "details.html?" + encrypted);
							aclick.setAttribute("data-toggle", "modal");
							aclick.setAttribute("id", v.id);
							aclick.classList.add("btn-block")
							var i = document.createElement("i");
							i.setAttribute("aria-hidden", "true");
							i.classList.add("fa");
							i.classList.add("fa-sign-in");
							aclick.innerHTML = "Visualizar ";
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
					}					
			});
		});		
	}else {
		$.each(result, function(k, v){
			
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
			var encrypted = CryptoJS.AES.encrypt(data.ca_id + "/" + v.id, "P4ssW0rJu3g0sKs3.com");
			var a = document.createElement("a");
			a.setAttribute("href", "details.html?" + encrypted);
			var img = document.createElement("img");
			img.classList.add("img-responsive");
			img.setAttribute("alt", "image");
			img.setAttribute("src", v.assets);
			
			var aclick = document.createElement("a");
			// aclick.setAttribute("onclick", "onModal(this,titu)");
			// aclick.addEventListener("click", onModal(this));
			aclick.setAttribute("href", "details.html?" + encrypted);
			aclick.setAttribute("data-toggle", "modal");
			aclick.setAttribute("id", v.id);
			aclick.classList.add("btn-block")
			var i = document.createElement("i");
			i.setAttribute("aria-hidden", "true");
			i.classList.add("fa");
			i.classList.add("fa-sign-in");
			aclick.innerHTML = "Visualizar ";
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
}

onInit();