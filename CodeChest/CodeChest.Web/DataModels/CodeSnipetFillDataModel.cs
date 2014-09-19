namespace CodeChest.Web.DataModels
{    
    using System;    
    using System.ComponentModel.DataAnnotations;    
    using System.Linq.Expressions;    

    using CodeChest.Models;

    public class CodeSnipetFillDataModel
    {
         
        public static Expression<Func<CodeSnipet, CodeSnipetFillDataModel>> FromCodeSnipet
        {
            get
            {
                return a => new CodeSnipetFillDataModel
                {
                    Id = a.Id,
                    UserId = a.UserId,                    
                    Title = a.Title,
                    Content = a.Content,
                    AddedOn = a.AddedOn,
                    Language = a.Language,                    
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
    }
}