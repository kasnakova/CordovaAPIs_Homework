namespace CodeChest.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Microsoft.AspNet.Identity;

    using CodeChest.Data;
    using CodeChest.Models;
    using CodeChest.Web.Infrastructure;
    using CodeChest.Web.DataModels;

    public class RatingsController : BaseApiController
    {
        public RatingsController(ICodeChestData data, IUserIdProvider userIdProvider)
            : base(data, userIdProvider)
        {
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult Rate(int id, RatingDataModel rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //TODO: KPK in general :D
            //TODO: check if this user hasn't already voted for this code snippet, the database returns an exception otherwise
            var currentUserId = this.userIdProvider.GetUserId();
            var newRating = new Rating
            {
                CodeSnipetId = id,
                UserId = currentUserId,
                Score = rating.Score,
                RatedOn = DateTime.Now
            };

            this.data.Ratings.Add(newRating);
            this.data.SaveChanges();

            UpdateLastActivityForUser();

            return Ok();
        }
    }
}