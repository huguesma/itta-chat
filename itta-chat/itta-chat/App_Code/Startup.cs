using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Startup
/// </summary>

[assembly: OwinStartup(typeof(Startup))] // nom du namespace
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        // disconecter après x secondes d'inactivité
        //GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(110);
        //
        var hubConfiguration = new HubConfiguration();
        hubConfiguration.EnableDetailedErrors = true;
        hubConfiguration.EnableJSONP = false;
        app.MapSignalR();
    }
}