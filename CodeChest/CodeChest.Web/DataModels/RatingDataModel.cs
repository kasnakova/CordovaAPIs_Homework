namespace CodeChest.Web.DataModels
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;

    using CodeChest.Models;

    public class RatingDataModel
    {
        public static Expression<Func<Rating, RatingDataModel>> FromCodeSnipet
        {
            get
            {
                return a => new RatingDataModel
                {
                    CodeSnipetId = a.CodeSnipetId,
                    UserId = a.UserId,
                    Score = a.Score
                };
            }
        }

        public int CodeSnipetId { get; set; }

        public string UserId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Score { get; set; }
    }
}