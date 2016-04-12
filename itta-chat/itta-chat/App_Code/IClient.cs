using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace itta_chat
{

    public interface IClient
    {
        void CheckConnect(bool connected);
        void ListUser(ICollection<dynamic> listusers);
        void RecepMessage(ICollection<dynamic> messages);
        void ValidLogout(bool connected);
        
    }
}