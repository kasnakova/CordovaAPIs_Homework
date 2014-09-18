namespace CodeChest.Common
{
    using PubNubMessaging.Core;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class PubNubConnection
    {
        const string PublishKey = "pub-c-d20af434-e645-4465-9c5d-9ac03f00da2d";
        const string SubscribeKey = "sub-c-800872c6-3f5f-11e4-8637-02ee2ddab7fe";
        const string SecretKey = "sec-c-YTM1YmQ4Y2MtZTVjYi00OGE5LTgyM2UtMDMyZGE4Zjc0MWI5";
        const string Origin = "pubsub.pubnub.com";
        const string ChannelName = "my_channel";
        static bool isSent;
        private Pubnub pubnub;

        public PubNubConnection()
        {
            this.pubnub = new Pubnub(PublishKey, SubscribeKey, SecretKey, "", false);
            this.pubnub.Origin = Origin;
            isSent = false;
        }

        public void PublishMessage(string message)
        {
            while (!isSent)
            {
                pubnub.Publish<string>(ChannelName, message, DisplayReturnMessage, DisplayErrorMessage);
                Thread.Sleep(1000);
                isSent = true;
            }
        }

        /// <summary>
        /// Callback method captures the response in JSON string format for all operations
        /// </summary>
        /// <param name="result"></param>
        private static void DisplayReturnMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Callback method captures the response in JSON string format for Subscribe
        /// </summary>
        /// <param name="result"></param>
        private static void DisplaySubscribeReturnMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Callback method captures the response in JSON string format for Presence
        /// </summary>
        /// <param name="result"></param>
        private static void DisplayPresenceReturnMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Callback method to provide the connect status of Subscribe call
        /// </summary>
        /// <param name="result"></param>
        private static void DisplaySubscribeConnectStatusMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Callback method to provide the connect status of Presence call
        /// </summary>
        /// <param name="result"></param>
        private static void DisplayPresenceConnectStatusMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        private static void DisplaySubscribeDisconnectStatusMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        private static void DisplayPresenceDisconnectStatusMessage(string result)
        {
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Callback method for error messages
        /// </summary>
        /// <param name="result"></param>
        private static void DisplayErrorMessage(PubnubClientError result)
        {
            Console.WriteLine();
            Console.WriteLine(result.Description);
            Console.WriteLine();
        }
    }
}
