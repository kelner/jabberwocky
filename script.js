/**
 * @author kelner
 */

var lp = 0;// licznik par dobrych
var ft = 0;// suma par
var tem = [];// zmienna tymczasowa - przechowuje pary do porownania
tem[1] = 0;
tem[2] = 0;
var koniec_testu = true;
var flips = 0; //licznik prob 

var p = 0;// licznik odkrytych pojedynczych pol

// tablica z obrazkami
var obrazek = inicjuj_obrazki();

// zmienne przechowujące czas
var start_time, end_time;

// stałe definiujące czy karta jest zakryta czy odkryta
var ZAKR = "zakryty", ODKR = "odkryty";

// USTAW OBRAZKI
var pole = []; // tablica 

// inicjuj pola
function inicjuj_pola() {
    // 25 elementów - max możliwych 
    for(var i = 0; i < 25; i++) {
        pole[i] = { obr: 0, stan: ZAKR };
    }
}

/**
 * inicjuje obrazki.
 * @return tablica z zainicjowanymi obrazkami.
 */
function inicjuj_obrazki() {
    var obrazek = [];
    var obrazki_katalog = "images/";
    var kat = obrazki_katalog + "flowers/";
    obrazek[0] = obrazki_katalog + "baobab.png";
    for(var i = 1; i <= 14; i++) {
        obrazek[i] = kat + i + ".jpeg";
    }

    return obrazek;
}

// generacja tablicy pól
function genTab(lix, liy) {
	var lixy = lix * liy, h, k,
		e = document.getElementById('ramka');
	//przydzielanie wylosowanych obrazkow, do pol	
	var sf = setfields(lixy);
	flips = 0;
	lp = 0;
	p = 0;
	
	for (c = 1; c <= lixy; c++) {
		pole[c].obr = sf[c-1];
		pole[c].stan = ZAKR;		
		}
	//wyswietlanie tablicy
	e.innerHTML = null;
	e.style.width = (lix * 118) + 10 + 'px';
	e.style.height = (liy * 118) + 10 + 'px';
	e.style.border = "1px solid white";
	for (h = 1; h <= lixy; h++) {
		e.innerHTML += '<img class="pole" id="p' + h + '" src="' + obrazek[0] + '" onclick="mainStart(' + h + ')"></img>';
	}
	ft = lixy; //ilosc elementow tablicy (do okreslenia ilosci par do odkrycia)
}

function setfields(ilosc_pol) {
	
	//ilosc_pol = Math.floor(ilosc_pol/2);
	var pula = [], tabelka = [], wynik, b = 1;
	//tworzenie zestawu obrazkow do wylosowania
	var a1 = 0,
		a2 = 0;//numer obrazka
	if (ilosc_pol%2) {
		pula.splice(0, 0, 1);
		a1 = a1 + 1;
		a2 = a2 + 1;
		}
	while (a1 < (ilosc_pol-1)) {
		pula.splice(a1, 0, a2+1, a2+1);
		a1 = a1 + 2;
		a2++;
	}
	//losowanie obrazka	
	
	for (ilosc_pol; ilosc_pol >= 1; ilosc_pol--) {
		var los = Math.floor(Math.random() * ilosc_pol);
		wynik = pula[los];
		tabelka.splice(b++, 0, wynik); 
		//usuwanie wylosowanego obrazka z zestawu
		pula.splice(los, 1);
	}
	//display
	
	return tabelka;
}


// wybor pola
function zmiana(nr) {
	if (p === 2) {
		return;
	}
	// zmiana statusu pola jesli zakryte
	if (pole[nr].stan !==  ZAKR) { return;
		} else {
		var a = document.getElementById('p' + nr);
		a.src = obrazek[pole[nr].obr];
		pole[nr].stan = ODKR;
		p++;
	}
}

function mainStart(nr) {
	if (koniec_testu === false) { return; }
	zmiana(nr);
	if (p === 2) {document.getElementById("czas").innerHTML
		koniec_testu = false;
		flips++;
		setTimeout("testMatrycy()", 400);
	}
}


function resetuj() {
        inicjuj_pola();
	start_time = new Date().getTime(5);
	document.getElementById("czas").innerHTML = 0;	
	lp = 0; // wyzeruj licznik par dobrych
	p = 0;
	flips = 0;
	if (ft===0) return;
	var i;
	for (i = 1; i <= ft; i++) {
		document.getElementById("p" + i).style.visibility = "visible";
		document.getElementById("p" + i).src = obrazek[0];
		pole[i].stan = ZAKR;
	}
}



// sprawdzanie czy oba odkryte sa takie same
function testMatrycy() {
	var b = 0, li;
	if (!Number(ft)) { alert("ft error"); }
	//szukanie odkrytych par - sprawdzanie czy dokladnie dwa pola sa odkryte 	
	for (li = 1; li <= ft; li++) {
		if (pole[li].stan === ODKR) {
			tem[++b] = li;
		}
	}
	// test zgodnosci odkrytych pol
	if (pole[tem[1]].obr === pole[tem[2]].obr) {
		document.getElementById("p" + tem[1]).style.visibility = "hidden";
		pole[tem[1]].stan = ZAKR;
		document.getElementById("p" + tem[2]).style.visibility = "hidden";
		pole[tem[2]].stan = ZAKR;
		lp++;
	} else {
		document.getElementById("p" + tem[1]).src = obrazek[0];
		pole[tem[1]].stan = ZAKR;
		document.getElementById("p" + tem[2]).src = obrazek[0];
		pole[tem[2]].stan = ZAKR;
	}
	tem[1] = 0;
	tem[2] = 0;
	p = 0;
	koniec_testu = true;
	if (lp === Math.floor(ft/2)) {
            end_time = new Date().getTime(5);
            document.getElementById("czas").innerHTML =
                Math.floor((end_time - start_time)/1000) + " SEKUND";
            alert("Wynik: "+flips);
        }
	
}
