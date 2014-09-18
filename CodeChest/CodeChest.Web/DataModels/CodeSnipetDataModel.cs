namespace CodeChest.Web.DataModels
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;

    using CodeChest.Models;

    public class CodeSnipetDataModel
    {
        public static Expression<Func<CodeSnipet, CodeSnipetDataModel>> FromCodeSnipet
        {
            get
            {
                return a => new CodeSnipetDataModel
                {
                    Id = a.Id,
                    UserId = a.UserId,                    
                    Title = a.Title,
                    Content = a.Content,
                    AddedOn = a.AddedOn,
                    Language = a.Language,
                    Poster = a.User.UserName,
                };
            }
        }

        public int Id { get; set; }

        public string UserId { get; set; }        

        [Required]
        public string Title { get; set; }

        [MinLength(10)]
        [Required]
        public string Content { get; set; }
        
        public DateTime AddedOn { get; set; }

        [Required]
        public LanguageType Language { get; set; }

        [Range(1, 5)]
        public double? Score { get; set; }

        public string Poster { get; set; }
    }
}