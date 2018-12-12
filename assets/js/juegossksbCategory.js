function onInit(){
    
    $.ajax({
        url: "./json/category.json",
        datatype: "json",
        success: function(result){

            result.sort(function(a, b){
				if(a.ca_name > b.ca_name) return 1;
				else if(b.ca_name > a.ca_name) return -1;
				return 0;
			});

            createTabs(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // alert(xhr.status);
            // alert(thrownError);
        }
    });

}

function createTabs(data){

    var divGet, divContainer, random, bgcolor, borcolor, divRow, cont;

    divGet = document.getElementById("idRowDiv");

    divRow = document.createElement("div")
    divRow.classList.add("col-md-12");
    cont = 0;

    /*=========================================
    CREACION DE LOS CATEGORIAS
    =========================================*/

    $.each(data, function(k, v){


        random = Math.floor(Math.random() * 6)+1;
        bgcolor = "bg-color-" + random;
        borcolor = "border-color-" + random;

        divContainer = document.createElement("div");
        divContainer.classList.add("col-md-3");
        divContainer.classList.add("col-xs-6");

        var div2 = document.createElement("div");
        div2.classList.add("box");
        div2.classList.add(bgcolor);

        var div3 = document.createElement("div");
        div3.classList.add("box-img");
        div3.classList.add(borcolor);
        div3.classList.add("text-center");

        var encrypted = CryptoJS.AES.encrypt(v.ca_id, "P4ssW0rJu3g0sKs3.com").toString();
        var a = document.createElement("a");

        a.setAttribute("href", "products.html?" + encrypted);
        var img = document.createElement("img");
        img.classList.add("img-responsive");
        img.setAttribute("alt", "image");
        img.setAttribute("src", v.ca_img);

        a.appendChild(img);
        div3.appendChild(a);

        var div4 = document.createElement("div");
        div4.classList.add("box-info");

        var titleCategory = document.createElement("h4");
        titleCategory.setAttribute("href", "products.html?" + encrypted);
        titleCategory.innerHTML = v.ca_name;

        div4.appendChild(titleCategory);

        div2.appendChild(div3);
        div2.appendChild(div4);

        divContainer.appendChild(div2);

        divRow.appendChild(divContainer);
        cont++;

        if(cont >= 4){
            divGet.appendChild(divRow);
            divRow = document.createElement("div")
            divRow.classList.add("col-md-12");
            cont = 0;
        }

    });

    if(cont < 4) {
        divGet.appendChild(divRow);
    }
    
}

onInit();
