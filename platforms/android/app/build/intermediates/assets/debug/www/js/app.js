
var pemesanan;
//Login
var idUser;//089654562911 = "Farid"= "089654562911"
var namaUser;
var token;
// variable global reservasi
var produkDipilih;
var waktuProdukDipilih;
var hargaProdukDipilih;
var idProdukDipilih;
var tanggalReservasi;

var arrayPesanan = [];
var iterasi = 0;
var totalHarga = 0;

//variable global terapis
var hariReservasi;
var terapisDipilih;
var idTerapisDipilih;
var tanggalTerapis;
var jamReservasi;
var jamBerakhirReservasi;
var idReservasi;
var isiAbout;


document.addEventListener('init', function (event) {
    var page = event.target;
    //halaman login
    if (page.id === 'login') {
        page.querySelector('#btnMasuk').onclick = function () {
            var userMasuk = document.getElementById("ponsel-masuk").value;
            var passMasuk = document.getElementById("pass-masuk").value;
            console.log(userMasuk, passMasuk);
            if (userMasuk != "" && passMasuk !=""){
            Login(userMasuk, passMasuk); // masuk ke authentication.js
            // document.querySelector('#myNavigator').pushPage('index.html');
            } else {
                ons.notification.alert('masukkan Username atau Password anda')
            }
        };
        page.querySelector('#user-daftar').onclick = function () {
            document.querySelector('#myNavigator').pushPage('daftar.html');
        };
        //halaman more
    } else if (page.id === 'Daftar') {
        page.querySelector('#btnDaftar').onclick = function () {
            // document.querySelector('#myNavigator').pushPage('kodeVerifikasiDaftar.html');
            let nomorDaftar = document.getElementById("ponsel-daftar").value;
            let namaDaftar = document.getElementById("nama-daftar").value;
            let passDaftar = document.getElementById("pass-daftar").value;
            let passDaftarLagi = document.getElementById("pass-daftar-2").value;
            let jenisKelamin = $('input[name=jenisKelamin]:checked').val();
            // console.log(jenisKelamin);
            showModal2();
            if (nomorDaftar != "" && namaDaftar != "" && passDaftar != "" && passDaftarLagi != "") {
                if (passDaftar === passDaftarLagi) {
                    $.ajax({
                        type: 'POST',
                        url: _URL + 'mutation{AddUser (nama:"' + namaDaftar + '", username:"' + nomorDaftar + '", password:"' + passDaftar + '", jk:"' + jenisKelamin + '"){id, nama, username}}',
                        success: function (data) {
                            document.querySelector('#ons-modal2').hide();
                            ons.notification.alert("anda telah berhasil mendaftar");
                            console.log(data);
                            document.querySelector('#myNavigator').popPage();
                        }, error: function (data) {
                            console.log(data);
                            document.querySelector('#ons-modal2').hide();
                            ons.notification.alert("Nomor yang anda masukkan telah terdaftar");
                            document.getElementById("ponsel-daftar").value = "";
                            document.getElementById("nama-daftar").value = "";
                            document.getElementById("pass-daftar").value = "";
                            document.getElementById("pass-daftar-2").value = "";
                        }
                    });
                } else {
                    document.querySelector('#ons-modal2').hide();
                    ons.notification.alert("Katasandi yang anda masukkan berbeda");
                }
            } else {
                document.querySelector('#ons-modal2').hide();
                ons.notification.alert("isi datanya dulu..");
            }
        };
        page.querySelector('#user-masuk').onclick = function () {
            document.querySelector('#myNavigator').popPage();
        };
        //halaman profil
    } else if (page.id === 'More') {
        page.querySelector('#profilUser').onclick = function () {
            document.querySelector('#myNavigator').pushPage('profil.html');
        };
        page.querySelector('#voucherUser').onclick = function () {
            document.querySelector('#myNavigator').pushPage('voucherSaya.html');
        };
        page.querySelector('#about').onclick = function () {
            document.querySelector('#myNavigator').pushPage('about.html');
        };
        //halaman profil
    } else if (page.id === 'Profil') {
        page.querySelector('#tombol-atur-profil').onclick = function () {
            document.querySelector('#myNavigator').pushPage('aturProfil.html');
        };
        page.querySelector('#tombol-kata-sandi').onclick = function () {
            document.querySelector('#myNavigator').pushPage('aturSandi.html');
        };
        // page.querySelector('#tombol-atur-nomor-telp').onclick = function () {
        //     document.querySelector('#myNavigator').pushPage('ubahNomor.html');
        // };
        page.querySelector('#tombol-atur-keluar').onclick = function () {
            // showModal8();
            // function showModal8() {
                document.querySelector('#ons-modal8').show();
                setTimeout(function () {
                    document.querySelector('#ons-modal8').hide();
                    Logout();
                }, 2000);
            // }
        };
    } else if (page.id === 'AturProfil') {
        page.querySelector('#tombol-simpan-nama-profil').onclick = function () {
            let namaBaru = document.getElementById("nama-user-baru").value;
            if (namaBaru != "") {
                showModal4();
                $.ajax({
                    type: 'POST',
                    url: _URL + 'mutation{changeProfile(id:' + _ID_SERVER_USER + ', username:"' + _ID_USER + '", nama:"' + namaBaru + '"){id,nama}}',
                    success: function (data) {
                        document.querySelector('#ons-modal4').hide();
                        ons.notification.alert("nama anda telah diubah");
                        _NAMA_USER = namaBaru;
                        updateData();
                        document.querySelector('#myNavigator').popPage();
                    }, error: function (data) {
                        console.log(data);
                        document.querySelector('#ons-modal4').hide();
                        ons.notification.alert("-----------");
                    }
                });
            }
            // document.querySelector('#myNavigator').popPage();
        };
        page.querySelector('#batal-simpan').onclick = function () {
            document.querySelector('#myNavigator').popPage();
        };
    } else if (page.id === 'AturSandi') {
        page.querySelector('#tombol-batal-kataSandi').onclick = function () {
            document.querySelector('#myNavigator').popPage();
        };
        page.querySelector('#tombol-simpan-pass').onclick = function () {
            let sandiLama = document.getElementById("kataSandi-lama").value;
            let sandiBaru = document.getElementById("kataSandi-baru").value;
            let sandiBaruLagi = document.getElementById("kataSandi-barulagi").value;
            if (sandiBaru === sandiBaruLagi) {
                showModal3();
                $.ajax({
                    type: 'POST',
                    url: _URL_RESERVASI + 'mutation{resetPassword(username:"' + _ID_USER + '", password: "' + sandiLama + '", new_password:"' + sandiBaru + '") {nama}}',
                    success: function (data) {
                        if (data.data.resetPassword.nama == null) {
                            document.querySelector('#ons-modal3').hide();
                            ons.notification.alert("katasandi lama anda salah");
                        } else {
                            document.querySelector('#ons-modal3').hide();
                            ons.notification.alert("katasandi diperbaharui " + data.data.resetPassword.nama);
                            document.querySelector('#myNavigator').popPage();
                        }
                        hapusValuePass();
                        console.log(data);
                        console.log(data.data.resetPassword.nama);
                    }, error: function (data) {
                        document.querySelector('#ons-modal3').hide();
                        ons.notification.alert("katasandi lama anda salah");
                        hapusValuePass();
                        console.log(data);
                    }
                });
            } else {
                document.querySelector('#ons-modal3').hide();
                ons.notification.alert("katasandi baru tidak cocok");
                document.getElementById("kataSandi-baru").value = null;
                document.getElementById("kataSandi-barulagi").value = null;
            }
        };
    } else if (page.id === 'Riwayat') {
        // page.querySelector('#riwayat-1').onclick = function () {
        //     document.querySelector('#myNavigator').pushPage('ulasan.html');
        // };
    } else if (page.id === 'Reservasi') {
        // page.querySelector('#input-paket-jasa').onclick = function () {
        //     document.querySelector('#myNavigator').pushPage('daftar-produk.html');
        // };
        // page.querySelector('#input-terapis').onclick = function () {
        //     // hitungJamBerakhir(jamReservasi);
        //     var waktu = jamReservasi;
        //     var jam = waktu.substr(0, 2);
        //     var menit = waktu.substr(3, 2);
        //     var jam2 = Number(jam) * 60;
        //     var menit2 = Number(menit);
        //     var hitung = jam2 + menit2 + waktuProdukDipilih;
        //     var jam3 = hitung / 60;
        //     var menit3 = hitung % 60;
        //     var jamnya = String(jam3).substr(0, 2);
        //     jamBerakhirReservasi = jamnya + ':' + menit3 + ':00';
        //     // ons.notification.alert('ini ' + jamBerakhirReservasi);
        //     document.querySelector('#myNavigator').pushPage('daftar-terapis.html');
        // };
        // page.querySelector('#tombol-batal').onclick = function () {
        //     hapusReservasi();
        // };
        page.querySelector('#tombol-pesan').onclick = function () {
            //pemesanan reservasi
            // if (produkDipilih != null && tanggalReservasi != null && terapisDipilih != null) {
            //     var produk = idProdukDipilih;
            //     let terapis = idTerapisDipilih;
            //     let tanggal = document.getElementById("input-tanggal").value;
            //     let thn = tanggal.substr(6, 4);
            //     let bln = tanggal.substr(3, 2);
            //     let hari = tanggal.substr(0, 2);
            //     let jam = tanggal.substr(12, 5);
            //     let tanggal2 = thn + '-' + bln + '-' + hari + ' ' + jam;
            //     // let terapis = document.getElementById("list-terapis");
            //     // let textTerapis = terapis.options[terapis.selectedIndex].text;
            //     showModal5();
            //     $.ajax({
            //         type: 'POST',
            //         url: _URL_RESERVASI + 'mutation{createHeaderReservasi(tanggal_reservasi: "' + tanggal2 + '", username: "' + _ID_USER + '", produk_id:' + produk + ', karyawan_id: ' + terapis + '){tanggal_reservasi, tamu}}',
            //         success: function (data) {
            //             document.querySelector('#ons-modal5').hide();
            //             ons.notification.alert("Pesanan anda telah diproses");
            //             console.log(data);
            //             // hapusReservasi();
            //         }, error: function (data) {
            //             document.querySelector('#ons-modal5').hide();
            //             ons.notification.alert("terjadi masalah koneksi");
            //             console.log(data);
            //         }
            //     });
            //     console.log(produk);
            //     console.log(textTerapis);
            //     console.log(tanggalReservasi);
            // } else {
            //     ons.notification.alert('isi datanya dulu :)');
            // }

            //ada array
            // var produk = idProdukDipilih;
            // let terapis = idTerapisDipilih;
            if (arrayPesanan.length > 0) {
                let tanggal = document.getElementById("input-tanggal").value;
                let thn = tanggal.substr(6, 4);
                let bln = tanggal.substr(3, 2);
                let hari = tanggal.substr(0, 2);
                let jam = tanggal.substr(12, 5);
                let tanggal2 = thn + '-' + bln + '-' + hari + ' ' + jam;
                // let terapis = document.getElementById("list-terapis");
                // let textTerapis = terapis.options[terapis.selectedIndex].text;
                showModal5();
                $.ajax({
                    method: 'post',
                    url: _URL + 'mutation{' +
                        'createHeaderReservasi(tanggal_reservasi: "' + tanggal2 + '", username: "' + _ID_USER + '", produk_id: ' + arrayPesanan[0].id_produk + ', karyawan_id: ' + arrayPesanan[0].id_terapis + ') {' +
                        'id,tamu}}',
                    success: function (data) {
                        console.log(data);
                        let idHeader = data.data.createHeaderReservasi.id;
                        console.log(idHeader);
                        if (arrayPesanan.length > 1) {
                            console.log(arrayPesanan);
                            for (k = 1; k < arrayPesanan.length; k++) {
                                $.ajax({
                                    method: 'post',
                                    url: _URL + 'mutation{createDetailReservasi(header_reservasi_id:' + idHeader + ',  produk_id: ' + arrayPesanan[k].id_produk + ', karyawan_id: ' + arrayPesanan[k].id_terapis + ') {header_reservasi_id}}',
                                    success: function (data) {

                                        console.log(data);

                                    },
                                    error: function (data) {
                                        ons.notification.alert("data ke-" + k + " tidak berhasil dimasukan");
                                        console.log(data);
                                    }
                                });
                            }

                        }
                        bersihkan();
                        document.querySelector('#ons-modal5').hide();
                        ons.notification.alert("Pesanan anda telah kami proses");
                    },
                    error: function (data) {
                        document.querySelector('#ons-modal5').hide();
                        ons.notification.alert(data);
                    }
                });
            } else {
                ons.notification.alert("masukkan data terlebih dahulu, atau tekan tombol tambah terlebih dahulu");
            }
        };
    } else if (page.id === 'Daftar-produk') {
        page.querySelector('#daftar-produk').onclick = function () {
            tampilTerapis();
            document.querySelector('#myNavigator').popPage();
        };
    } else if (page.id === 'Daftar-terapis') {
        page.querySelector('#daftar-terapis').onclick = function () {
            document.querySelector('#myNavigator').popPage();
        };
    }
    // else if (page.id === 'ReservasiUser') {
    //     page.querySelector('#fix-batal').onclick = function () {
    //         showModal7();
    //         $.ajax({
    //             type: 'POST',
    //             url: _URL + 'mutation{batalReservasi(ref_id: "' + idReservasi + '"){tanggal_reservasi, tamu, kode}}',
    //             success: function (data) {
    //                 console.log(data);
    //                 document.querySelector('#ons-modal7').hide();
    //                 document.getElementById("batal-dialog").hide();
    //                 tampilkanReserfasiSaya();
    //             }, error: function (data) {
    //                 document.querySelector('#ons-modal7').hide();
    //                 console.log(data);
    //             }
    //         });
    //     };
    // }


});

// fungsi isi data user
function setDataUser(datatoken, nama, userId) {
    token = datatoken;
    namaUser = nama;
    idUser = userId;
}

// fungsi isi data halaman reservasi
function setDataProduk(nama, waktu, harga, id) {
    produkDipilih = nama;
    waktuProdukDipilih = waktu;
    hargaProdukDipilih = harga;
    idProdukDipilih = id;
}

// fungsi isi data terapis yang dipilih
function setDataTerapis(nama, id) {
    terapisDipilih = nama;
    idTerapisDipilih = id;
}
// menghapus isi inputan reservasi
// function hapusReservasi() {
//     var l = iterasi;
//     for (i=0; i<l; i++){

//     }
//     document.getElementById("input-tanggal").value = null;
//     document.getElementById("input-paket-jasa").value = null;
//     document.getElementById("input-terapis").value = null;
//     document.getElementById("estimasi-harga").innerHTML = "Rp. ";
//     produkDipilih = null;
//     waktuProdukDipilih = null;
//     hargaProdukDipilih = null;
//     tanggalReservasi = null;
//     terapisDipilih = null;
// }

function setTanggalReservasi(jam, hari, tanggal) {
    tanggalReservasi = tanggal; //tanggal 2018-12-31
    hariReservasi = hari; //senin, selasa, rabu
    jamReservasi = jam; // 10:00:00
}

function setDataAbout(data) {
    isiAbout = data;
}

//method batal reservasi user
var batalreser = function (id) {
    var id2 = id.substr(1, id.length);
    console.log(id2);
    $.ajax({
        type: 'POST',
        url: _URL + 'mutation{batalReservasi(ref_id: "' + id2 + '"){tanggal_reservasi, tamu, kode}}',
        success: function (data) {
            console.log(data);
            // document.getElementById("batal-dialog").hide();
        }, error: function (data) {
            console.log(data);
        }
    });
}

// //method mengirim voucher ke user lain
// var kirimVoucher = function (idVoucher) {
//     var nomorTujuan = document.getElementById('nomor-tujuan').value;
//     console.log(nomorTujuan);
//     if (nomorTujuan != "") {
//         showModal6()
//         $.ajax({
//             type: 'POST',
//             url: _URL + 'mutation{UpdateOwner(id: ' + idVoucher + ', username:"' + nomorTujuan + '") {id, owner_id{id, nama}}}',
//             success: function (data) {
//                 document.querySelector('#ons-modal6').hide();
//                 console.log(idVoucher);
//                 hideDialog();
//                 if (data == 'string(18) \"Username not exist\"\n') {
//                     ons.notification.alert("Username tidak ditemukan");
//                 } else {
//                     ons.notification.alert("Voucher anda telah dikirim");
//                 }
//                 console.log(data);
//             }, error: function (data) {
//                 document.querySelector('#ons-modal6').hide();
//                 console.log(data);
//                 ons.notification.alert("terjadi masalah");
//                 hideDialog();
//             }
//         });
//     } else {
//         ons.notification.alert("nomor yang anda tuju belum terisi . .");
//     }
// }

// fungsi uang tanda titik
var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//modal pada voucher untuk menampilkan codeQR dan mengirim voucher
function showModal() {
    document.querySelector('#ons-modal').show();
    // setTimeout(function () {
    //     modal.hide();
    // }, 2000);
}
//modal di daftar
function showModal2() {
    document.querySelector('#ons-modal2').show();
}
//modal di atur pass
function showModal3() {
    document.querySelector('#ons-modal3').show();
}
//modal di atur profil
function showModal4() {
    document.querySelector('#ons-modal4').show();
}
// modal di pesan
function showModal5() {
    document.querySelector('#ons-modal5').show();
}
// modal di kirim voucher
function showModal6() {
    document.querySelector('#ons-modal6').show();
}
// modal di batal reservasi
function showModal7() {
    document.querySelector('#ons-modal7').show();
}


// hide dialog pada halaman reservasiUser
var hideDialogReser = function () {
    document.getElementById("batal-dialog").hide();
    document.querySelector('#ons-modal5').hide();
    $('#isi-batal').empty();
};

// hide dialog pada halaman voucher
var hideDialog = function () {
    document.getElementById("Qr-dialog").hide();
    $('.alert-dialog-title').empty();
    $('.alert-dialog-content').empty();
    $('.alert-dialog-footer').empty();
};

//hapus isi input ganti pasword
function hapusValuePass() {
    document.getElementById("kataSandi-lama").value = null;
    document.getElementById("kataSandi-baru").value = null;
    document.getElementById("kataSandi-barulagi").value = null;
}

// let durasi;
                // if (waktuProdukDipilih == 30) {
                //     durasi = "00:30:00";
                // } else if (waktuProdukDipilih == 60) {
                //     durasi = "01:00:00";
                // } else if (waktuProdukDipilih == 90) {
                //     durasi = "01:30:00";
                // } else {
                //     durasi = "02:00:00";
                // }