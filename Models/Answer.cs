using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yeetmeto.space.Models
{
    public class Throw : Base
    {
        public int Id { get; set; }

        public string Value { get; set; }
    }
}