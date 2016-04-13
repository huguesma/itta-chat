using System;
using System.Collections.Generic;
using System.Linq;


namespace itta_chat {
    public class ChatUser {
        String username;
        String connectioid;
        bool status;

        public String Connectioid
        {
            get { return connectioid; }
            set { connectioid = value; }
        }

        public String Username
        {
            get { return username; }
            set { username = value; }
        }

        public bool Status
        {
            get { return status; }
            set { status = value; }
        }


    }
}