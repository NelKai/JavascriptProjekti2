
function getInfo() {

    // luodaan yhteys Finnkino REST API:in

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlTxt = xmlhttp.responseXML;

            // haetaan xml-tiedostosta tiedot (elokuvan nimet, teatterit, näytösajat yms.)
           
           var otsikot = xmlTxt.getElementsByTagName("Title");
           var teatterit = xmlTxt.getElementsByTagName("Theatre");
           var jVuodet = xmlTxt.getElementsByTagName("ProductionYear");
           var pituudet = xmlTxt.getElementsByTagName("LengthInMinutes");
           var aloitusAjat = xmlTxt.getElementsByTagName("dttmShowStart");
           var lopetusAjat = xmlTxt.getElementsByTagName("dttmShowEnd");
           var ikaRajaKuvat = xmlTxt.getElementsByTagName("RatingImageUrl");
           var showt = xmlTxt.getElementsByTagName("Show");
           var kuvaURLit = xmlTxt.getElementsByTagName("EventSmallImagePortrait");
           var teatteriIDt = xmlTxt.getElementsByTagName("TheatreID");

           var elokuvatiedot;

           // luodaan taulukko, jossa tiedot esitetään

           var data = "<table border='1px solid black' id='datatable'>" +
                            "<th>Elokuvan nimi</th>" +
                            "<th>Näytöksen tiedot</th>" + 
                            "<th>Elokuvan pituus (min)</th>" +
                            "<th>Ikäraja</th>" + 
                            "<th></th>";
            
            var menu = document.getElementById("dropMenu");
                        
           for (var i = 0; i < showt.length; i++) {

                // tallennetaan tiedot JSON-muotoon
                         
                elokuvatiedot = {nimi:otsikot[i].childNodes[0].nodeValue,
                                julkaisuvuosi:jVuodet[i].childNodes[0].nodeValue, 
                                teatteri:teatterit[i].childNodes[0].nodeValue,
                                teatteriID:teatteriIDt[i].childNodes[0].nodeValue,
                                aloitusaika:aloitusAjat[i].childNodes[0].nodeValue,
                                lopetusaika:lopetusAjat[i].childNodes[0].nodeValue,
                                pituus:pituudet[i].childNodes[0].nodeValue,
                                ikärajaKuva:ikaRajaKuvat[i].childNodes[0].nodeValue,
                                kuva:kuvaURLit[i].childNodes[0].nodeValue};
                
                // muutetaan aloitus- ja lopetusajat Date-muotoon

                var aloitusaika = new Date(elokuvatiedot.aloitusaika);
                var lopetusaika = new Date(elokuvatiedot.lopetusaika);

                if (menu.options[menu.selectedIndex].value == elokuvatiedot.teatteri) { // tulostetaan vain haetun teatterin näytökset ja lisätään ne taulukkoon rivi kerrallaan
                        data += '<tr>';
                        data += '<td>' + elokuvatiedot.nimi + "<br>(" + elokuvatiedot.julkaisuvuosi + ")" + '</td>';
                        data += '<td>' + elokuvatiedot.teatteri + "<br>(" + aloitusaika.toUTCString() + " - " + lopetusaika.toUTCString() + ")" + '</td>'; 
                        data += '<td>' + elokuvatiedot.pituus + '</td>';
                        data += '<td><img src="' + elokuvatiedot.ikärajaKuva + '"></td>';
                        data += '<td><img src="' + elokuvatiedot.kuva + '"></td>';
                        data += '<tr>';

                        document.getElementById("taulukko").innerHTML = data; // tuodaan taulukko näkyviin ruudulle
                } 
            }
            data += "</table>"; // ja lopuksi suljetaan taulukko
        }
    }
}

// lisätään dropdown-menun tapahtumakuuntelija

document.getElementById("dropMenu").addEventListener("change", function() {
    getInfo();
});
