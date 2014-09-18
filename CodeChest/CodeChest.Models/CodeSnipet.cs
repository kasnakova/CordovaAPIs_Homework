namespace CodeChest.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class CodeSnipet
    {
        private ICollection<Rating> ratings;

        public CodeSnipet()
        {
            this.ratings = new HashSet<Rating>();
        }

        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }        

        [Required]
        public string Title { get; set; }

        [MinLength(10)]
        [Required]
        public string Content { get; set; }
        
        public DateTime AddedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [Required]
        public LanguageType Language { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<Rating> Ratings
        {
            get
            {
                return this.ratings;
            }

            set
            {
                this.ratings = value;
            }
        }        
    }
}
