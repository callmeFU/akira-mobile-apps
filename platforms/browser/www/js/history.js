function testHistory() {
    console.log(document.querySelector('ons-navigator').pages);
    console.log(history.length);

    var riwayat = document.querySelector('ons-navigator').pages;
    var panjang = riwayat.length;
    console.log(panjang);

    document.addEventListener("backbutton", onBackKeyDown, false);
    // Handle the back button
    function onBackKeyDown(e) {
        if (panjang == 0) {
            alert("hallo...");
            e.preventDefault();
        }
    }
}