namespace CodeChest.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;

    using CodeChest.Data.Repositories;
    using CodeChest.Models;

    public class CodeChestData : ICodeChestData
    {
        private DbContext context;
        private IDictionary<Type, object> repositories;

        public CodeChestData(DbContext context)
        {
            this.context = context;
            this.repositories = new Dictionary<Type, object>();
        }

        public IRepository<User> Users
        {
            get
            {
                return this.GetRepository<User>();
            }
        }

        public IRepository<CodeSnipet> CodeSnipets
        {
            get
            {
                return this.GetRepository<CodeSnipet>();
            }
        }

        public IRepository<Rating> Ratings
        {
            get
            {
                return this.GetRepository<Rating>();
            }
        }


        public int SaveChanges()
        {
            return this.context.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            var typeOfRepository = typeof(T);
            if (!this.repositories.ContainsKey(typeOfRepository))
            {
                var newRepository = Activator.CreateInstance(typeof(GenericRepository<T>), context);
                this.repositories.Add(typeOfRepository, newRepository);
            }

            return (IRepository<T>)this.repositories[typeOfRepository];
        }
    }
}
