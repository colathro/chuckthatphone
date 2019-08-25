using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using yeetmeto.space.DataAccess;
using yeetmeto.space.Models;
using Microsoft.EntityFrameworkCore;

namespace yeetmeto.space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YeetController : ControllerBase
    {
        private readonly DBContext _context;

        public YeetController(DBContext context)
        {
            _context = context;
        }

        [Route("top")]
        [HttpGet]
        public ActionResult<List<Yeet>> GetTop(int count, int page)
        {
            string sql = @"SELECT * FROM Yeet";
            if (page >= 1)
            {
                sql += $" ORDER BY Yeet.YeetDate DESC OFFSET {count} * ({page}  - 1) ROWS FETCH NEXT {count} ROWS ONLY";
            }
            else
            {
                throw new ArgumentException("Missing page parameter.");
            }
            return _context.Yeet.FromSql(sql).ToList();
        }

        [Route("topdevice")]
        [HttpGet]
        public ActionResult<List<Yeet>> GetDeviceTop(int count, int page, string device = "")
        {
            string sql = $"SELECT * FROM Yeet where Yeet.Device = '{device}'";
            if (page >= 1)
            {
                sql += $" ORDER BY Yeet.YeetDate DESC OFFSET {count} * ({page}  - 1) ROWS FETCH NEXT {count} ROWS ONLY";
            }
            else
            {
                throw new ArgumentException("Missing page parameter.");
            }
            return _context.Yeet.FromSql(sql).ToList();
        }
        
        [HttpPost]
        public void Post([FromBody] Yeet yeet)
        {
            yeet.YeetDate = DateTime.UtcNow;
            yeet.Accepted = false;
            _context.Yeet.Add(yeet);
            _context.SaveChanges();
        }
    }
}
