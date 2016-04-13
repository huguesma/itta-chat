$(function () {
    $('.label').hide();
    $('#cnxOff').show();
    $('#alert').hide();
    $('#errorLogin').hide();
    $('#btnLogoff').hide();
    $('#succesLogout').hide();
    console.log(document.cookie["username"]);
    if (getCookie('username')) {
        $('#login').val(getCookie('username'));
        $('#cnxOff').hide();
        $('#cnxOn').show();
        $('#btnLogin').hide();
        $('#btnLogoff').show();
        $('#login').prop('disabled', true);
    }
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
            $('#succesLogout').fadeOut(6000);
            deleteAllCookies();
        } 
    };
    hubChat.client.cleanCookie = function () {
        deleteAllCookies();
        $('#login').val('');
        $('#cnxOff').show();
        $('#cnxOn').hide();
        $('#btnLogin').show();
        $('#btnLogoff').hide();
        $('#login').prop('disabled', false);
    };
    hubChat.client.retrevepMessages = function (messages) {
        console.log('La list ^des MESSAGE ?');
        console.log(messages);
        for (var k in messages) {
            console.log(messages[k]);

            addChat(messages[k].userfrom.Username, messages[k].Message, messages[k].Datetime_message, messages[k].userto.Username);
        }
    };
    hubChat.client.listUser = function (listusers) {
        console.log(listusers);
        var select = $('input[name=user]:checked').val();
        $('#cnxUser dl').html('');

        for (var k in listusers) {
            console.log(k, listusers[k]);
            if (listusers[k].Username != $('#login').val()) {
                

                console.log("La fenetre existe : "+ $('#' + listusers[k].Username + ' ul').length)
                if ($('#' + listusers[k].Username + ' ul').length == 0) {
                    generateChatWindows(listusers[k].Username, listusers[k].Username);
                }
                var dd = $('<dd/>');
                var inputT = $('<input/>').addClass('userlist').attr('type', 'radio').attr('value', listusers[k].Username).attr('name', 'user');
                //$('#cnxUser dl').append("<dd><input class='userlist' name='user' type='radio' value='" + listusers[k].Username + "' />" + listusers[k].Username + "</dd>");
                if (select == listusers[k].Username) {
                    console.log('Cest le bon user : ' + select);
                    inputT.prop('checked', true);
                }else{
                    console.log('Non Cest pas le bon user : ' + select + ' '+ (select == listusers[k].Username));
                }
                console.log(inputT);
                dd.append(inputT).append(listusers[k].Username);

                $('#cnxUser dl').append(dd);
            }
        }
        $('.chatPanel').hide();
        $('#' + select).show();
        $('input[type=radio][name=user]').change(function () {
            $('.chatPanel').hide();
            $('#' + this.value).show();
        });
    };
    hubChat.client.recepMessage = function (message) {
        console.log("From : " + message.userfrom.Username);
        console.log("Message : " + message.Message);
        console.log("Time : " + message.Datetime_message);
        console.log("Time : " + message.userto.Username);
        $('#alert div').html('<span class="glyphicon glyphicon-warning-sign"></span>Message de ' + message.userfrom.Username);
        $('#alert').show();
        $('#alert').fadeOut(10000);
        addChat(message.userfrom.Username, message.Message, message.Datetime_message,  message.userto.Username);
    };
    window.hubChat = hubChat;
    $.connection.hub.start().done(
        function () {
            if (getCookie('username')) {

                hubChat.server.update($('#login').val());
            }
            $('#btnLogin').click(function () {
                if ($('#login').val() != '') {
                    document.cookie = "username="+$('#login').val();
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
        var divCol = $('<div/>').addClass('col-md-12 chatPanel').attr('id', id);
        var divPanel = $('<div/>').addClass('panel panel-primary');
        var divPanelHead = $('<div/>').addClass('panel-heading');
        var spanGly = $('<span/>').addClass('glyphicon glyphicon-comment');
        var divPanelBody = $('<div/>').addClass('panel-body');
        var ul = $('<ul/>').addClass('chat');
        var divPanelFooter = $('<div/>').addClass('panel-footer');
        var divInput = $('<div/>').addClass('input-group');
        var input = $('<input/>').addClass('form-control input-sm').attr('id', 'btn-input' + id).attr('placeholder', 'Votre texte...');
        var spanButton = $('<span/>').addClass('input-group-btn');
        var button = $('<button/>').addClass('btn btn-warning btn-sm btnSend').click(sendMessage).text('Envoyer');
        spanButton.append(button);
        divInput.append(input).append(spanButton);
        divPanelFooter.append(divInput);
        divPanelBody.append(ul);
        divPanelHead.append(spanGly).append('Chat avec : ' + name);
        divPanel.append(divPanelHead).append(divPanelBody).append(divPanelFooter);
        divCol.append(divPanel);

        //var start = '<div class="col-md-12" id="' + id + '"><div class="panel panel-primary">';

        //start = start + '<div class="panel-heading" ><span class="glyphicon glyphicon-comment"></span> Chat avec : '+name+'</div>';
        //var middle = '<div class="panel-body"><ul class="chat"></ul></div>';
        //var end = '<div class="panel-footer"><div class="input-group"><input id="btn-input' + id + '" type="text" class="form-control input-sm" placeholder="Votre texte..." /> <span class="input-group-btn"><button class="btn btn-warning btn-sm btnSend" onclick="sendMessage();">Envoyer</button> </span></div></div></div>';
        $('#chatList').append(divCol);

    }
    
    function addChat(from, text, time, to) {
        var pos = 'right';
        var id = from;
        if (from == $('#login').val()) {
            pos = 'left';
            id = to;
        }
        var li = $('<li/>').addClass(pos + ' clearfix');
        var divH = $('<div/>').addClass('chat-body clearfix');
        var divHeader = $('<div/>').addClass('header');
        var small = $('<small/>').addClass('text-muted');
        var span = $('<span/>').addClass('glyphicon glyphicon-time');
        var strong = $('<strong/>').addClass('pull-right primary-font');
        var p = $('<p/>').text(text);
        small.append(span).append(time);
        strong.append(from);
        divHeader.append(small).append(strong);
        divH.append(divHeader).append(p);
        li.append(divH);
        $('#' + id + ' ul').append(li);
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
        window.addChat($('#login').val(), $('#btn-input' + to + '').val(), $.now(), to);
        console.log(window.hubChat);
        $('#btn-input' + to + '').val('');
    }
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

