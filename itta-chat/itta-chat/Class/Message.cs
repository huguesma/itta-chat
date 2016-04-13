using System;
using System.Collections.Generic;
using System.Linq;


namespace itta_chat {
    public class Messages {

        ChatUser userfrom;
        ChatUser userto;
        String message;
        bool stat_message;
        DateTime datetime_message;


        public String Message
        {
            get { return message; }
            set { message = value; }
        }

        public bool Stat_message
        {
            get { return stat_message; }
            set { stat_message = value; }
        }

        public DateTime Datetime_message
        {
            get { return datetime_message; }
            set { datetime_message = value; }
        }

    }

}