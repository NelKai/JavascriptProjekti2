function getInfo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           // document.getElementById("info").innerHTML=xmlhttp.responseText;
           var xmlTxt = xmlhttp.responseXML;
           var otsikot = xmlTxt.getElementsByTagName("Title");
           
           
           for (var i = 0; i < otsikot.length; i++) {
               otsikko = "<br><input type='button' id='btn_" + i + "' value='" + otsikot[i].childNodes[0].nodeValue + "' style='width:300px;'><br>";
               document.getElementById("info").innerHTML += otsikko;
           }

        }
    }
}

document.getElementById("infoBtn").addEventListener("click", function() {
    getInfo();
});


