$(function () {
    var hubChat = $.connection.chatHub;
    $.connection.hub.start().done(
               function () {
                   alert("cnx etablie");
               }
           );
});