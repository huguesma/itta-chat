﻿using System;
using System.Collections.Generic;
using System.Linq;


namespace itta_chat {
    public class Messages {

        public ChatUser userfrom;
        public ChatUser userto;
        String message;
        bool stat_message;
        String datetime_message;
        DateTime dateMes;

        public DateTime DateMes
        {
            get { return dateMes; }
            set { dateMes = value; }
        }


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

        public String Datetime_message
        {
            get { return datetime_message; }
            set { datetime_message = value; }
        }

    }

}