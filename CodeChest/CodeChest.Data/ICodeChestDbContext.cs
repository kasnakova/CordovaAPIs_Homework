namespace CodeChest.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    using CodeChest.Models;

    public interface ICodeChestDbContext
    {
        IDbSet<User> Users { get; set; }

        IDbSet<CodeSnipet> CodeSnipets { get; set; }

        IDbSet<Rating> Ratings { get; set; }

        int SaveChanges();

        IDbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}
