$(function () {
    $('.label').hide();
    $('#cnxOff').show();
    $('#errorLogin').hide();
    $('#btnLogoff').hide();
    $('#succesLogout').hide();

    $('#cnxUser dl').html('');

    var hubChat = $.connection.chatHub;
    hubChat.client.checkConnect = function (estConnecte) {
        console.log(estConnecte);
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
    hubChat.client.ValidLogout = function (estDeConnecte) {
        console.log(estDeConnecte);
        if (estDeConnecte) {
            $('#cnxOff').show();
            $('#cnxOn').hide();
            $('#btnLogin').show();
            $('#btnLogoff').hide();
            $('#login').prop('disabled', false);
            $('#succesLogout').show();
            $('#succesLogout').fadeOut(10);
        } 
    };
    hubChat.client.listUser = function (listusers) {
        console.log(listusers);
        $('#cnxUser dl').html('');
        for (var k in listusers) {
            console.log(k, listusers[k]);
            if (listusers[k].Username != $('#login').val()) {
                console.log("La fenetre existe : "+ $('#' + listusers[k].Username + ' ul').length)
                if ($('#' + listusers[k].Username + ' ul').length == 0) {
                    generateChatWindows(listusers[k].Username, listusers[k].Username);
                }
                $('#cnxUser dl').append("<dd><input class='userlist' name='user' type='radio' value='" + listusers[k].Username + "' />" + listusers[k].Username + "</dd>");
            }
        }
    };
    hubChat.client.recepMessage = function (message) {
        console.log("From : " + message.userfrom.Username);
        console.log("Message : " + message.Message);
        console.log("Time : " + message.Datetime_message);
        console.log("Time : " + message.userto.Username);

        addChat(message.userfrom.Username, message.Message, message.Datetime_message,  message.userto.Username);
    };
    window.hubChat = hubChat;
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
            $('#btnLogoff').click(function () {
                    hubChat.server.onLogout($('#login').val());
            });
        }
    );
    function generateChatWindows(name, id) {

        var start = '<div class="col-md-12" id="' + id + '"><div class="panel panel-primary">';

        start = start + '<div class="panel-heading" ><span class="glyphicon glyphicon-comment"></span> Chat avec : '+name+'</div>';
        var middle = '<div class="panel-body"><ul class="chat"></ul></div>';
        var end = '<div class="panel-footer"><div class="input-group"><input id="btn-input' + id + '" type="text" class="form-control input-sm" placeholder="Votre texte..." /> <span class="input-group-btn"><button class="btn btn-warning btn-sm btnSend" onclick="sendMessage();">Envoyer</button> </span></div></div></div>';
        $('#chatList').append(start + middle + end);

    }
    
    function addChat(from, text, time, to) {
        var pos = 'right';
        var id = from;
        if (from == $('#login').val()) {
            pos = 'left';
            id = to;
        }
        var txt = '<li class="' + pos + ' clearfix"><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>' + time + '</small><strong class="pull-right primary-font">' + from + '</strong></div><p>' + text + '</p></div></li>';
        console.log(txt);
        console.log($('#' + id + ' ul'));
        $('#' + id + ' ul').append(txt);
    }
    window.addChat = addChat;
});

function sendMessage() {
    var to = $('input[name=user]:checked').val();
    console.log(to);
    if (!to) {
        alert('Merci de choisir un destinataire');
    } else {
        console.log("Destinataire : " + to);
        console.log("Texte : " + $('#btn-input' + to + '').val());
        window.hubChat.server.sendMessage($('#login').val(), to, $('#btn-input' + to + '').val());
        window.addChat($('#login').val(), $('#btn-input' + to + '').val(), new Date().getDate(), to);
        console.log(window.hubChat);
        $('#btn-input' + to + '').val('');
    }
}