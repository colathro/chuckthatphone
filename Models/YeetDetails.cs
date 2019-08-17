using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yeetmeto.space.Models
{
    public class YeetDetail
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }
    }
}