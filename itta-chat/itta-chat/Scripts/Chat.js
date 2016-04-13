$(function () {
    $('.label').hide();
    $('#cnxOff').show();
    $('#errorLogin').hide();
    $('#btnLogoff').hide();
    $('#cnxUser dl').html('');

    var hubChat = $.connection.chatHub;
    hubChat.client.checkConnect = function (estConnecte) {
        alert(estConnecte);
        if (estConnecte) {
            $('#cnxOff').hide();
            $('#cnxOn').show();
            $('#btnLogin').hide();
            $('#btnLogoff').show();
            $('#login').prop('disabled', true);
        } else {
            alert("Le nom d'utilisateur existe déjà");
        }
    };
    hubChat.client.listUser = function (listusers) {
        alert(listusers);
        for (var i = 0; i < 50; i++) {
            $('#cnxUser dl').append("<dd><input class='userlist' name='user' type='radio' value='UserID1' />John" + i +"</dd>");
        }
    };
    $.connection.hub.start().done(
        function () {
            alert("cnx etablie");
            $('#btnLogin').click(function () {
                if ($('#login').val() != '') {
                    hubChat.server.onLogg($('#login').val());
                    $('#errorLogin').hide();
                } else {
                    $('#errorLogin').show();
                }
            });
        }
    );
});