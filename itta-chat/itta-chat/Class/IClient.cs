using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace itta_chat
{

    public interface IClient
    {
        void CheckConnect(bool connected);
        void ListUser(ICollection<ChatUser> listusers);
        void RecepMessage(ICollection<Messages> messages);
        void ValidLogout(bool connected);
    }
}