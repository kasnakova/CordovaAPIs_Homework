namespace CodeChest.Common
{
    using PubNubMessaging.Core;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class PubNubConnection
    {
        static public Pubnub pubnub;
        const string PublishKey = "pub-c-d20af434-e645-4465-9c5d-9ac03f00da2d";
        const string SubscribeKey = "sub-c-800872c6-3f5f-11e4-8637-02ee2ddab7fe";
        const string SecretKey = "sec-c-YTM1YmQ4Y2MtZTVjYi00OGE5LTgyM2UtMDMyZGE4Zjc0MWI5";
        const string Origin = "pubsub.pubnub.com";
        const string ChannelName = "my_channel";
        const bool isSent = false;
    }
}
