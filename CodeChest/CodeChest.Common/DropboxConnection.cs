namespace CodeChest.Common
{
    using System;
    using System.IO;

    using Spring.IO;
    using Spring.Social.Dropbox.Api;
    using Spring.Social.Dropbox.Connect;
    using Spring.Social.OAuth1;
    using System.Diagnostics;    

    public class DropboxConnection
    {
        //Authentication strings for our App in Dropbox -> CodeChest - Kiwi Team
        private const string DropboxAppKey = "vai9i115amput2s";
        private const string DropboxAppSecret = "1oseca41p38a1f1";
        private const string OAuthTokenFileName = "OAuthTokenFileName.txt";

        public IDropbox dropbox = null;
        public Entry uploadedPhoto = null;

        public DropboxConnection()
        {
        }

        public void UploadNewUserAvatar(string avatarLocalPath, string username)
        {
            dropbox = ConnectToDropboxAPI();

            string uploadPhotoName = String.Format("/{0}.jpg", username);

            uploadedPhoto = dropbox.UploadFileAsync(new FileResource(avatarLocalPath), uploadPhotoName).Result;
        }

        public IDropbox ConnectToDropboxAPI()
        {
            DropboxServiceProvider dropboxServiceProvider =
                new DropboxServiceProvider(DropboxAppKey, DropboxAppSecret, AccessLevel.AppFolder);

            // Authenticate the application (if not authenticated) and load the OAuth token
            if (!File.Exists(OAuthTokenFileName))
            {
                AuthorizeAppOAuth(dropboxServiceProvider);
            }
            OAuthToken oauthAccessToken = LoadOAuthToken();

            // Login in Dropbox
            dropbox = dropboxServiceProvider.GetApi(oauthAccessToken.Value, oauthAccessToken.Secret);

            return dropbox;
        }

        //Login with the already saved authentication strings from the user - in our case -> we are the client's dropbox, too
        private OAuthToken LoadOAuthToken()
        {
            string[] lines = File.ReadAllLines(OAuthTokenFileName);
            OAuthToken oauthAccessToken = new OAuthToken(lines[0], lines[1]);
            return oauthAccessToken;
        }

        //Save the newly became authorization strings in a file to reuse them later (not authorize again every time)
        private void AuthorizeAppOAuth(DropboxServiceProvider dropboxServiceProvider)
        {
            // Authorization without callback url
            OAuthToken oauthToken = dropboxServiceProvider.OAuthOperations.FetchRequestTokenAsync(null, null).Result;

            OAuth1Parameters parameters = new OAuth1Parameters();
            string authenticateUrl = dropboxServiceProvider.OAuthOperations.BuildAuthorizeUrl(
                oauthToken.Value, parameters);
            Process.Start(authenticateUrl);
            AuthorizedRequestToken requestToken = new AuthorizedRequestToken(oauthToken, null);
            OAuthToken oauthAccessToken =
                dropboxServiceProvider.OAuthOperations.ExchangeForAccessTokenAsync(requestToken, null).Result;

            string[] oauthData = new string[] { oauthAccessToken.Value, oauthAccessToken.Secret };
            File.WriteAllLines(OAuthTokenFileName, oauthData);
        }

        public string GetShareableLink(string photoName)
        {
            DropboxLink sharedUrl = dropbox.GetShareableLinkAsync(uploadedPhoto.Path).Result;
            return sharedUrl.Url;
        }
    }
}
