using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleWebApi.Controllers
{
    public class CalculationsController : ApiController
    {
        [Route("Sum")]
        public IHttpActionResult GetSum(int a, int b) {
            return Ok(a + b);
        }
    }
}
