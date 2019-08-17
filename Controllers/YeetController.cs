using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using yeetmeto.space.DataAccess;
using yeetmeto.space.Models;

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
        public ActionResult<List<Yeet>> GetTop(int count)
        {
            return _context.Yeet.OrderByDescending(y => y.HeightMeters).Take(count).ToList();
        }

        [Route("devicetop")]
        [HttpGet]
        public ActionResult<List<Yeet>> GetDeviceTop(int count, string device = "")
        {
            return _context.Yeet.Where(y => y.Device == device).OrderByDescending(y => y.HeightMeters).Take(count).ToList();
        }
        // POST api/values
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
