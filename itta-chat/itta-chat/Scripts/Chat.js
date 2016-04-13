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
            if (listusers[k].Username != $('#login').val()){
                $('#cnxUser dl').append("<dd><input class='userlist' name='user' type='radio' value='" + listusers[k].Connectioid + "' />" + listusers[k].Username + "</dd>");
            }
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
            $('#btnLogoff').click(function () {
                
                    hubChat.server.onLogout($('#login').val());
                
            });
        }
    );
    function generateChatWindows(name,id) {
        var start = '<div class="panel panel-primary">';
        start = start + ' <div class="panel-heading" ><span class="glyphicon glyphicon-comment"></span> Chat avec : '+name+'</div></div>';
        var middle = '<div><div class="panel-body"><ul class="chat"></ul></div>';
        var end = '<div class="panel-footer"><div class="input-group"><input id="btn-input' + id + '" type="text" class="form-control input-sm" placeholder="Votre texte..." /> <span class="input-group-btn"><button class="btn btn-warning btn-sm btnSend" >Envoyer</button> </span></div></div></div>';
    }
});