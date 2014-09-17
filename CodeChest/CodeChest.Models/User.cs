namespace CodeChest.Models
{
    using System;    
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;    
    using System.Security.Claims;    
    using System.Threading.Tasks;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;    
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser
    {
        private ICollection<CodeSnipet> codeSnipets;
        private ICollection<Rating> ratings;

        public User()
        {
            this.codeSnipets = new HashSet<CodeSnipet>();
            this.ratings = new HashSet<Rating>();
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        public DateTime LatestActivityDate { get; set; }
        
        public DateTime RegistrationDate { get; set; }

        public string AvatarUrl { get; set; }

        public virtual ICollection<CodeSnipet> CodeSnipets
        {
            get
            {
                return this.codeSnipets;
            }

            set
            {
                this.codeSnipets = value;
            }
        }

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
