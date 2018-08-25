var _STORAGE = window.localStorage;
var _TOKEN = '';
var _NAMA_USER;
var _ID_USER;
var _ID_SERVER_USER;
var _JENIS_KELAMIN;

function Login(userMasuk, passMasuk) {
    if (_STORAGE.getItem('token')) {     //Debug
        _STORAGE.removeItem('token');
    };
    showModal();
    $.ajax({
        type: 'POST',
        url: _URL + 'mutation{Authenticate(input: {username:"' + userMasuk + '", password:"' + passMasuk + '"}) {token, user {id, username, jenis_kelamin, nama, organizations{nama,scopes}}}}',
        success: function (data) {
            document.querySelector('#ons-modal').hide();
            var isi = data.data.Authenticate;
            if (isi != null) {
                _TOKEN = isi.token;
                _NAMA_USER = isi.user.nama;
                _ID_USER = isi.user.username;
                _ID_SERVER_USER = isi.user.id;
                _JENIS_KELAMIN = isi.user.jenis_kelamin;
                let anHour = (new Date().getTime()) + 3600000;
                _EXPIRED_DATE_TOKEN = anHour;
                //menyimpan di localstorage
                _STORAGE.setItem('token', _TOKEN);
                _STORAGE.setItem('nama-user', _NAMA_USER);
                _STORAGE.setItem('id-user', _ID_USER);
                _STORAGE.setItem('id-server-user', _ID_SERVER_USER);
                _STORAGE.setItem('jenis_kelamin', _JENIS_KELAMIN);
                _STORAGE.setItem('expired_date_token', _EXPIRED_DATE_TOKEN);
                console.log(_STORAGE.getItem('token'));
                if (_STORAGE.getItem('token')) {
                    document.querySelector('#myNavigator').replacePage('menuUtama.html');
                }
            } else {
                document.getElementById('pass-masuk').value = null;
                ons.notification.alert('Username atau Password yang anda masukkan salah');
                document.querySelector('#ons-modal').hide();
            }
        }, error: function (data) {
            console.log(data);
            document.getElementById('pass-masuk').value = null;
            document.querySelector('#ons-modal').hide();
            ons.notification.alert("Username atau Password yang anda masukkan salah");
        }
    });
    console.log(_STORAGE.getItem('token'));
}

function Logout() {
    _STORAGE.removeItem('token');
    _STORAGE.removeItem('nama-user');
    _STORAGE.removeItem('id-user');
    _STORAGE.removeItem('id-server-user');
    _STORAGE.removeItem('jenis_kelamin');
    _STORAGE.removeItem('expired_date_token');
    document.querySelector('#myNavigator').resetToPage('login.html');
}


function Authenticate() {
    if (localStorage.getItem('token')) {
        let expired_date = parseInt(localStorage.getItem('expired_date_token'));
        let date_now = new Date().getTime();
        if (date_now > expired_date) {
            ons.notification.alert('Anda harus login ulang');
            Logout();
        }
    } else {
        Logout();
    }
}

function LoginAuthenticate() {
    if (localStorage.getItem('token')) {
        let expired_date = parseInt(localStorage.getItem('expired_date_token'));
        let date_now = new Date().getTime();
        console.log('Expired date: ' + localStorage.getItem('expired_date_token'));
        console.log('Date now : ' + date_now);
        if (date_now < expired_date) {
            _TOKEN = localStorage.getItem('token');
            _NAMA_USER = localStorage.getItem('nama-user');
            _ID_USER = localStorage.getItem('id-user');
            _JENIS_KELAMIN = localStorage.getItem('jenis_kelamin');
            _ID_SERVER_USER =localStorage.getItem('id-server-user');
            _EXPIRED_DATE_TOKEN = expired_date;
            document.querySelector('#myNavigator').pushPage('menuUtama.html');
        } else {
            _STORAGE.removeItem('token');
            _STORAGE.removeItem('nama_user');
            _STORAGE.removeItem('expired_date_token');
            _STORAGE.removeItem('id-server-user');
            _STORAGE.removeItem('jenis_kelamin');
            ons.notification.alert('Anda harus login ulang');
            document.querySelector('#myNavigator').pushPage('login.html');
        }
    } else {
        document.querySelector('#myNavigator').pushPage('login.html');
    }
}

function updateData(){
    $.ajax({
        type : 'post',
        url : _URL + 'query{users (username:"'+_ID_USER+'"){nama}}',
        success: function(data){
            var namaBaru = data.data.users[0].nama;
            _STORAGE.removeItem('nama_user');
            _STORAGE.setItem('nama-user', namaBaru);
            console.log(namaBaru);
        }, error : function(data){
            console.log(data);
        }
    });
}