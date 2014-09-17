namespace CodeChest.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Rating
    {
        [Key, Column(Order = 1)]
        public int CodeSnipetId { get; set; }

        [Key, Column(Order = 2)]
        public string UserId { get; set; }

        [Range(1, 5)]
        public int Score { get; set; }

        [Required]
        public DateTime RatedOn { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("CodeSnipetId")]
        public virtual CodeSnipet CodeSnipet { get; set; }
    }
}
