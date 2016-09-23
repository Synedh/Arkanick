var socket = io.connect('http://synedh.ddns.net:8000');

$('#form').submit(function () {
    var pseudo = $('#pseudo').val();
    socket.emit('pseudo', pseudo);
    return false;
});

socket.on('logon', function(auth) {
    if (auth)
        alert("Login successfull !"):
    else {
        alert("This username is yet used, please choose an other one.");
        $('#pseudo').val('').focus()
    }
})