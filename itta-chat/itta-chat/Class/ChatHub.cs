using itta_chat;
using itta_chat.Class;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

public class ChatHub : Hub<IClient>
{

    public void OnLogg(String username)
    {
        ICollection<ChatUser> list = Contener.Userlist;
        String cid = Context.ConnectionId;
        bool result = list.ToList().Where(x => x.Username == username).FirstOrDefault() == null;
        Clients.Client(cid).CheckConnect(result);

        if (result)
        {
            var chatuser = new ChatUser();
            chatuser.Connectioid = cid;
            chatuser.Username = username;
            chatuser.Status = true;
            Contener.Userlist.Add(chatuser);
            Clients.All.ListUser(Contener.Userlist);
        }

    }
    public void Update(String username) {
        var user = Contener.Userlist.ToList().Where(x => x.Username == username).FirstOrDefault();
        if (user != null) {
            user.Connectioid = Context.ConnectionId;
            Clients.Client(Context.ConnectionId).RetrevepMessages(Contener.Messagelist.ToList().Where(m => m.userfrom.Username == username || m.userto.Username == username).ToList());

        } else {
            Clients.Client(Context.ConnectionId).cleanCookie();
        }

    }

    public void OnLogout(String username)
    {
        ICollection<ChatUser> list = Contener.Userlist;
        String cid = Context.ConnectionId;
        bool result = list.ToList().Where(x => x.Username == username).FirstOrDefault() != null;
        Clients.Client(cid).ValidLogout(result);

        if (result)
        {
            var chatuser = new ChatUser();
            chatuser.Connectioid = cid;
            chatuser.Username = username;
            chatuser.Status = false;

            Contener.Userlist.Remove(chatuser);

            Clients.All.ListUser(Contener.Userlist);
        }

    }


    public void SendMessage(String userfrom, String userto,String text)
    {

        DateTime dt = DateTime.Now; // Or whatever
        String sdate = dt.ToString("mm.ss HH - dd-MM-yyyy");
        Messages message = new Messages();

        ICollection<ChatUser> listuser = Contener.Userlist;

        message.userfrom = listuser.ToList().Where(x => x.Username == userfrom).FirstOrDefault();
        message.userto = listuser.ToList().Where(x => x.Username == userto).FirstOrDefault();

       

        //message.userfrom = Contener.Userlist.ToList().Where(x => x.Username == userfrom).FirstOrDefault();
        //message.userto = Contener.Userlist.ToList().Where(x => x.Username ==userto).FirstOrDefault();
        message.Datetime_message = sdate;
           

        message.Message = text;


        Contener.Messagelist.Add(message);
        Clients.Client(message.userfrom.Connectioid).RecepMessage(message);
        Clients.Client(message.userto.Connectioid).RecepMessage(message);

        
    }

    public override Task OnConnected()
    {
        string cid = Context.ConnectionId;
        Clients.Client(cid).ListUser(Contener.Userlist);
        return base.OnConnected();
    }
    public override Task OnReconnected()
    {
        return base.OnReconnected();
    }
    public override Task OnDisconnected(bool stopCalled)
    {
        return base.OnDisconnected(stopCalled);
    }
}

