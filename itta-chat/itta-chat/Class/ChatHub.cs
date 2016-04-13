using itta_chat;
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
       
    }

    public void SendMessage()
    {
    }

    public override Task OnConnected()
    {
        string cid = Context.ConnectionId;
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

