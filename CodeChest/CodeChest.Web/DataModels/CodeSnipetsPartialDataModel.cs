namespace CodeChest.Web.DataModels
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;
    using System.Linq;

    using CodeChest.Models;

    public class CodeSnipetsPartialDataModel
    {
        public static Expression<Func<CodeSnipet, CodeSnipetsPartialDataModel>> FromCodeSnipet
        {
            get
            {
                return a => new CodeSnipetsPartialDataModel
                {
                    Id = a.Id,
                    Poster = a.User.UserName,
                    Title = a.Title,
                    AddedOn = a.AddedOn,
                    Language = a.Language,
                    Score = (a.Ratings.Sum(r => r.Score)/((double?)a.Ratings.Count()))
                };
            }
        }

        public int Id { get; set; }        

        [Required]
        public string Title { get; set; }

        public string Poster { get; set; }

        public DateTime AddedOn { get; set; }
        
        public LanguageType Language { get; set; }

        [Range(1, 5)]
        public double? Score { get; set; }
    }
}