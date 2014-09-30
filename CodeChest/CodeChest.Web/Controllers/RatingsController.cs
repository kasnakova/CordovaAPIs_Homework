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

        // Route - api/Ratings/Rate?id={id}
        // RatingDataModel - r.Score
        [Authorize]
        [HttpPost]
        public IHttpActionResult Rate(int id, RatingDataModel rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var snipet = data.CodeSnipets.All().Where(c => c.Id == id).FirstOrDefault();
            if (snipet == null)
            {
                return BadRequest("This snipet does not exist!");
            }

            var currentUserId = this.userIdProvider.GetUserId();

            if (currentUserId == snipet.UserId)
            {
                return BadRequest("You cannot rate your own snippets!");
            }

            var newRating = data.Ratings
                .All()
                .Where(r => r.UserId == currentUserId && r.CodeSnipetId == id)
                .FirstOrDefault();

            if (newRating == null)
            {
                newRating = new Rating
                {
                    CodeSnipetId = id,
                    UserId = currentUserId,
                    Score = rating.Score,
                    RatedOn = DateTime.Now
                };

                this.data.Ratings.Add(newRating);
            }
            else
            {
                newRating.Score = rating.Score;
                newRating.RatedOn = DateTime.Now;
            }
            
            this.data.SaveChanges();

            UpdateLastActivityForUser();

            return Ok();
        }
    }
}