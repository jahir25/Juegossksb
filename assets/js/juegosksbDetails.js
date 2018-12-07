var param, jsonUrl;
function onInit(){
    var urlGet = location.href;
    var index = urlGet.indexOf("?");
    var encrypted = urlGet.substr(index+1, urlGet.length);
    var decrypted = CryptoJS.AES.decrypt(encrypted, "P4ssW0rJu3g0sKs3.com").toString(CryptoJS.enc.Utf8);
    var indexDe = decrypted.indexOf("/");
    var data = decrypted.substr(0, indexDe);
    param = decrypted.substr(indexDe + 1, decrypted.length);


    $.ajax({
        url: "./json/category.json",
        datatype: "json",
        success: function(result){
            $.each(result, function(k, v){
                if(v.ca_id == data){
                    document.getElementById("idCategory").innerHTML = v.ca_name;
                    document.getElementById("idTitlePage").innerHTML = v.ca_name;                    
                    $.ajax({
                        url: v.ca_json,
                        datatype: "json",
                        success: function(result2){
                            createElementsProduc(result2);           
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            // alert(xhr.status);
                            // alert(thrownError);
                        }
                    });
                }
            });            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
        }
    });    
}

function createElementsProduc(data){
            
    var li, img, a, lilist, imglist, ulnav, linav, anav, divtab, divmenu, divmedia, ultablist, liitem, item;
    var ulView = document.getElementById("idUlPreview");
    var ulList = document.getElementById("idUlList");

    var containerTab = document.getElementById("idTabContainer");

    $.each(data, function(k, v){
       if(v.id == param){
        document.getElementById("idTitleProduc").innerHTML = v.titulo;

            /*
            =================================================================================
                                                CREATE IMAGES VIEW
            =================================================================================
            */

            $.each(v.imgs, function(ki, vi){
                /*
                ===================================================
                            VIEW OPTIONS IMAGES
                ===================================================
                */
                if(ki == 0){
                    li = document.createElement("li");
                    // li.setAttribute("id", "");
                    img = document.createElement("img");
                    img.setAttribute("src", vi.src);
                    img.setAttribute("id", "idLeftView");
                    img.setAttribute("alt", "Product");
                    img.classList.add("img-responsive");                                               
                    li.appendChild(img);             
                    ulView.appendChild(li);    
                }                
                /*
                ===================================================
                            LEFH OPTIONS IMAGES
                ===================================================
                */
                lilist = document.createElement("li");
                lilist.onclick = function(){
                    onClickElement(this, ulList);
                }
                if(ki == 0){
                    lilist.classList.add("active");
                    li.classList.add("current");
                }
                a = document.createElement("a");
                imglist = document.createElement("img");
                imglist.setAttribute("src", vi.src);
                imglist.setAttribute("href", "");
                imglist.setAttribute("alt", "Product");
                imglist.classList.add("img-responsive");                             
                a.appendChild(imglist);                
                lilist.appendChild(a);
                ulList.appendChild(lilist);
                               
            });

            /*
            =================================================================================
                                                CREATE INFO PRODUCT
            =================================================================================
            */
            ulnav = document.createElement("ul");
            ulnav.classList.add("nav");
            ulnav.classList.add("nav-tabs");

            divtab = document.createElement("div");
            divtab.classList.add("tab-content");

            $.each(v.info, function(k, v){
                /*
                ===================================================
                                    NAVS INFO PRODUCT
                ===================================================
                */
                linav = document.createElement("li");
                anav = document.createElement("a");
                anav.setAttribute("data-toggle", "tab");
                anav.innerHTML = v.title;
                linav.appendChild(anav);                
                ulnav.appendChild(linav);

                var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);

                linav.setAttribute("id", id);
                
                divmenu = document.createElement("div");
                divmenu.setAttribute("id", id+"div");
                divmenu.classList.add("tab-pane");
                divmenu.classList.add("col-md-6");
                divmenu.classList.add("fade");

                linav.onclick = function(){
                    onClickNav(this, divtab);
                }

                if(k == 0){
                    linav.classList.add("active");
                    divmenu.classList.add("in");
                    divmenu.classList.add("active");
                }

                divmedia = document.createElement("div");
                divmedia.classList.add("media");
                
                ultablist = document.createElement("ul");
                ultablist.classList.add("list-unstyled");
                ultablist.classList.add("para-list");

                $.each(v.text, function(kt, vt){

                    liitem = document.createElement("li");
                    liitem.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>"+ " "+ vt.texto;
                    // item = document.createElement("i");
                    // item.classList.add("fa");
                    // item.classList.add("fa-check");
                    // item.setAttribute("aria-hidden", "true");
                    // liitem.appendChild(item);
                    ultablist.appendChild(liitem);
                });

                divmedia.appendChild(ultablist);
                divmenu.appendChild(divmedia);
                divtab.appendChild(divmenu);

            });
            containerTab.appendChild(ulnav);
            containerTab.appendChild(divtab);
       }       
    });
}

function onClickElement(element, list){
    var classElementName = element.className;


    $.each(list.getElementsByTagName("li"), function(k, v){
        v.classList.remove("active");
        v.classList.remove("current");
    })
    element.classList.add("active");
    element.classList.add("current");

    document.getElementById("idLeftView").src = element.getElementsByTagName("img")[0].getAttribute("src");

}

function onClickNav(element, tab){
    //console.log(element, tab);

    var id = element.id;

    $.each(tab.getElementsByTagName("div") , function(k, v){        
        if(v.id == id+"div"){
            v.classList.add("in");
            v.classList.add("active");
        }else{
            v.classList.remove("in");
            v.classList.remove("active");
        }

    });

}

onInit();