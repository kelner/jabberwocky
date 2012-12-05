module("Inicjalizacja");

test( "test długości tablicy z obrazkami", function() {
    var obrazki = inicjuj_obrazki();
    equal( obrazki.length, 15, "zła długość tablicy, powinno być 15 " );
});