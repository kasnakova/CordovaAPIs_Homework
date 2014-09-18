namespace CodeChest.Web.DataModels
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;

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
                    //UserId = a.UserId,
                    Title = a.Title,
                    //AddedOn = a.AddedOn,
                    //Language = a.Language
                };
            }
        }

        public int Id { get; set; }
        //TODO: da se reshi dali samo title shte se pokazva pri nachalnoto tursene i nachalnata stranica ili i drugi neshta
        //public string UserId { get; set; }

        [Required]
        public string Title { get; set; }

        //public DateTime AddedOn { get; set; }

        //[Required]
       // public LanguageType Language { get; set; }

        //[Range(1, 5)]
        //public int? Score { get; set; }
    }
}