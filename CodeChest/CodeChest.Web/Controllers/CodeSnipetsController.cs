namespace CodeChest.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Microsoft.AspNet.Identity;

    using CodeChest.Data;
    using CodeChest.Models;
    using CodeChest.Web.Infrastructure;
    using CodeChest.Web.DataModels;

    //Route - api/CodeSnipets
    public class CodeSnipetsController : BaseApiController
    {
        private const string NO_CODE_SNIPET = "Code snippet does not exist or has been deleted!";
        private const string NOT_YOUR_SNIPET = "You can not edit/delete someone else's code snippet!";
        private const int CODESNIPETS_ON_PAGE = 10;
        //TODO: konstantite da se iznesat v otdelen klas/enum ili kakto e kulturno

        public CodeSnipetsController(ICodeChestData data, IUserIdProvider userIdProvider)
            : base(data, userIdProvider)
        {
        }

        //Route - api/CodeSnipets/All
        [HttpGet]
        public IHttpActionResult All()
        {
            var codeSnipetTitles = this.data
                .CodeSnipets
                .All()
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet);

            return Ok(codeSnipetTitles);
        }

        //Route - api/CodeSnipets/ById?id={id}
        [HttpGet]
        public IHttpActionResult ById(int id)
        {
            var codeSnipet = this.data
                .CodeSnipets
                .All()
                .Where(c => c.Id == id)
                .Select(CodeSnipetDataModel.FromCodeSnipet)
                .FirstOrDefault();

            if (codeSnipet == null)
            {
                return BadRequest(NO_CODE_SNIPET);
            }

            codeSnipet.Score = CalculateScoreForSnipet(codeSnipet.Id);
            return Ok(codeSnipet);
        }

        //Route - api/CodeSnipets/ByLanguage?language={language}
        [HttpGet]
        public IHttpActionResult ByLanguage(LanguageType language)
        {
            var codeSnipetTitles = this.data
                .CodeSnipets
                .All()
                .Where(c => c.Language == language)
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet);

            return Ok(codeSnipetTitles);
        }

        //Route - api/CodeSnipets/ByTitle?title={title}
        [HttpGet]
        public IHttpActionResult ByTitle(string title)
        {
            var codeSnipetTitles = this.data
                .CodeSnipets
                .All()
                .Where(c => c.Title.Contains(title))
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet);

            return Ok(codeSnipetTitles);
        }

        //Route - api/CodeSnipets/ByPage?page={page}
        [HttpGet]
        public IHttpActionResult ByPage(int page)
        {
            var codeSnipetTitles = this.GetAllOrderedByDate()
                .Skip(CODESNIPETS_ON_PAGE * page)
                .Take(CODESNIPETS_ON_PAGE)
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet).ToList();

            return Ok(codeSnipetTitles);
        }

        //Route - api/CodeSnipets/Filter?language={language}&page={page}&title={title}
        [HttpGet]
        public IHttpActionResult Filter(LanguageType? language, int? page, string title)
        {
            int actualPage = page != null ? (int)page : 0;

            var codeSnipetTitles = this.data
                .CodeSnipets.All()
                .Where(c => (title != null ? c.Title.Contains(title) : true)
                    && (language.HasValue ? (c.Language == language) : true))
                .OrderBy(c => c.AddedOn)
                .Skip(CODESNIPETS_ON_PAGE * actualPage)
                .Take(CODESNIPETS_ON_PAGE)
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet)
                .ToList();

            return Ok(codeSnipetTitles);
        }

        //Route - api/CodeSnipets/GetCurrent?page={page}
        [Authorize]
        [HttpGet]
        public IHttpActionResult GetCurrent(int page)
        {
            var id = this.userIdProvider.GetUserId();

            var codeSnipetTitle = this.data
                .CodeSnipets
                .All()
                .Where(c => c.UserId == id)
                .OrderBy(c => c.AddedOn)
                .Skip(CODESNIPETS_ON_PAGE * page)
                .Take(CODESNIPETS_ON_PAGE)
                .Select(CodeSnipetsPartialDataModel.FromCodeSnipet)
                .ToList();

            return Ok(codeSnipetTitle);
        }

        //Route api/CodeSnipets/GetLanguagesUsed
        [Authorize]
        [HttpGet]
        public IHttpActionResult GetLanguagesUsed()
        {
            var id = this.userIdProvider.GetUserId();

            var languagesUsed = this.data
                .CodeSnipets
                .All()
                .Where(c => c.UserId == id)
                .Select(c => c.Language)
                .Distinct();

            ICollection<string> result = new List<string>();
            foreach (var language in languagesUsed)
            {
                result.Add(Enum.GetName(typeof(LanguageType), language));
            }

            return Ok(result);
        }

        //Route - api/CodeSnipets/Create
        //CodeSnipetDataModel - Title = a.Title, Content = a.Content, Language = a.Language
        [Authorize]
        [HttpPost]
        public IHttpActionResult Create(CodeSnipetDataModel codeSnipet)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUserId = this.userIdProvider.GetUserId();
            var newCodeSnipet = new CodeSnipet
            {
                Content = codeSnipet.Content,
                Language = codeSnipet.Language,
                Title = codeSnipet.Title,
                UserId = currentUserId,
                AddedOn = DateTime.Now
            };

            this.data.CodeSnipets.Add(newCodeSnipet);
            this.data.SaveChanges();

            UpdateLastActivityForUser();

            return Ok(newCodeSnipet.Id);
        }

        // Route - api/CodeSnipets/Update
        //CodeSnipetDataModel - Title = a.Title, Content = a.Content, Language = a.Language
        [Authorize]
        [HttpPut]
        public IHttpActionResult Update(int id, CodeSnipetDataModel codeSnipet)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingCodeSnipet = this.data.CodeSnipets.All().FirstOrDefault(a => a.Id == id);
            if (existingCodeSnipet == null)
            {
                return BadRequest(NO_CODE_SNIPET);
            }

            var currentUserId = this.userIdProvider.GetUserId();
            if (existingCodeSnipet.UserId != currentUserId)
            {
                return BadRequest(NOT_YOUR_SNIPET);
            }

            existingCodeSnipet.Content = codeSnipet.Content;
            existingCodeSnipet.Language = codeSnipet.Language;
            existingCodeSnipet.Title = codeSnipet.Title;
            this.data.SaveChanges();

            codeSnipet.Id = id;
            codeSnipet.UserId = existingCodeSnipet.UserId;
            codeSnipet.AddedOn = existingCodeSnipet.AddedOn;
            codeSnipet.Score = CalculateScoreForSnipet(id);

            UpdateLastActivityForUser();

            return Ok(codeSnipet);
        }

        // Route - api/CodeSnipets/Delete?id={id}
        [Authorize]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var existingCodeSnipet = this.data.CodeSnipets.All().FirstOrDefault(a => a.Id == id);
            if (existingCodeSnipet == null)
            {
                return BadRequest(NO_CODE_SNIPET);
            }

            var currentUserId = this.userIdProvider.GetUserId();
            if (existingCodeSnipet.UserId != currentUserId)
            {
                return BadRequest(NOT_YOUR_SNIPET);
            }

            this.data.CodeSnipets.Delete(existingCodeSnipet);
            this.data.SaveChanges();

            UpdateLastActivityForUser();

            return Ok();
        }

        private double? CalculateScoreForSnipet(int id)
        {
            var ratings = this.data.Ratings
                .All()
                .Where(r => r.CodeSnipetId == id)
                .Select(RatingDataModel.FromCodeSnipet);

            double sum = 0;
            double? score = null;

            if (ratings.Count() > 0)
            {
                foreach (var rating in ratings)
                {
                    sum += rating.Score;
                }

                score = sum / ratings.Count();
            }

            return score;
        }

        private IQueryable<CodeSnipet> GetAllOrderedByDate()
        {
            return this.data
                .CodeSnipets
                .All()
                .OrderBy(c => c.AddedOn);
        }
    }
}