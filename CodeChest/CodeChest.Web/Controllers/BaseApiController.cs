namespace CodeChest.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;

    using CodeChest.Data;
    using CodeChest.Web.Infrastructure;

    public abstract class BaseApiController : ApiController
    {
        protected ICodeChestData data;
        protected IUserIdProvider userIdProvider;

        protected BaseApiController(ICodeChestData data, IUserIdProvider userIdProvider)
        {
            this.data = data;
            this.userIdProvider = userIdProvider;
        }

        protected void UpdateLastActivityForUser()
        {
            var currentUserId = this.userIdProvider.GetUserId();
            var userToUpdate = this.data.Users
                .All()
                .Where(u => u.Id == currentUserId)
                .FirstOrDefault();

            userToUpdate.LatestActivityDate = DateTime.Now;
            this.data.SaveChanges();
        }
    }
}