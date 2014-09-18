namespace CodeChest.Web.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Principal;
    using System.Web;
    using System.Threading;

    using Microsoft.AspNet.Identity;

    public class AspNetUserIdProvider : IUserIdProvider
    {
        public string GetUserId()
        {
            return Thread.CurrentPrincipal.Identity.GetUserId();
        }
    }
}