using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace itta_chat.Class
{
    public static class Contener
    {
        private static ICollection<ChatUser> userlist = new List<ChatUser>();
        private static ICollection<Messages> messagelist = new List<Messages>();

        public static ICollection<ChatUser> Userlist
        {
            get { return Contener.userlist; }
            set { Contener.userlist = value; }
        }


        public static ICollection<Messages> Messagelist
        {
            get { return Contener.messagelist; }
            set { Contener.messagelist = value; }
        }
    }
}