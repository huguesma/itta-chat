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

        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            if(obj.GetType() == typeof(ChatUser))
            {
                return this.username == ((ChatUser)obj).Username;
            }

            // Return true if the fields match:
            return false;
        }

    }
}