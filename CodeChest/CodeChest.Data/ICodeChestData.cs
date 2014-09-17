namespace CodeChest.Data
{
    using CodeChest.Data.Repositories;
    using CodeChest.Models;

    public interface ICodeChestData
    {
        IRepository<User> Users { get; }

        IRepository<CodeSnipet> CodeSnipets { get; }

        IRepository<Rating> Ratings { get; }

        int SaveChanges();
    }
}
