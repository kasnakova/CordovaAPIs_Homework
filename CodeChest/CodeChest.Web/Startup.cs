﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CodeChest.Web.Startup))]

namespace CodeChest.Web
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    using Ninject.Web.Common.OwinHost;
    using Ninject.Web.WebApi.OwinHost;
    using Ninject.Web.WebApi;
    using Ninject.Web;
    using Ninject;
    using System.Reflection;
    using System.Data.Entity;

    using CodeChest.Data;
    using CodeChest.Web.Infrastructure;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.UseNinjectMiddleware(CreateKernel).UseNinjectWebApi(GlobalConfiguration.Configuration);
        }

        private static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());
            RegisterMappings(kernel);
            return kernel;
        }

        private static void RegisterMappings(StandardKernel kernel)
        {
            kernel.Bind<ICodeChestData>().To<CodeChestData>()
                .WithConstructorArgument("context",
                    c => new CodeChestDbContext());

            kernel.Bind<IUserIdProvider>().To<AspNetUserIdProvider>();
        }
    }
}
