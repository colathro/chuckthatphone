using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yeetmeto.space.Models
{
    public class Yeet
    {
        [Key]
        public int Id { get; set; }

        public YeetDetail YeetDetail { get; set; }

        [MaxLength(50)]
        public string Device { get; set; }

        public float HeightMeters { get; set; }

        public bool Accepted { get; set; }

        public DateTime YeetDate { get; set; }
    }
}