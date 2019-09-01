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
            if (page >= 1)
            {
                return _context.Yeet.FromSql($"SELECT * FROM Yeet ORDER BY Yeet.HeightMeters DESC OFFSET {count} * ({page}  - 1) ROWS FETCH NEXT {count} ROWS ONLY").ToList();
            }
            else
            {
                throw new ArgumentException("Missing page parameter.");
            }
        }

        [Route("topdevice")]
        [HttpGet]
        public ActionResult<List<Yeet>> GetDeviceTop(int count, int page, string device = "")
        {        
            if (page >= 1)
            {
                return _context.Yeet
                    .FromSql($"SELECT * FROM Yeet where Yeet.Device = {device} ORDER BY Yeet.HeightMeters DESC OFFSET {count} * ({page}  - 1) ROWS FETCH NEXT {count} ROWS ONLY").ToList();
            }
            else
            {
                throw new ArgumentException("Missing page parameter.");
            }
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
