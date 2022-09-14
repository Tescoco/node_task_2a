"use strict";

// Segment: Weather API
var updateWeatherInterval = function updateWeatherInterval() {
  setTimeout(function _callee() {
    var response, data, _data$current, condition, temp_c;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch("/v1/weather"));

          case 2:
            response = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(response.json());

          case 5:
            data = _context.sent;
            _data$current = data.current, condition = _data$current.condition, temp_c = _data$current.temp_c;
            console.log(condition);
            document.querySelector(".degree").textContent = temp_c;
            document.querySelector(".tempImg").setAttribute("src", condition.icon);
            updateWeatherInterval();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }, 300000);
};

updateWeatherInterval(); // get dates

var date = new Date();
var EST_time = date.toLocaleString("en-GB", {
  timeZone: "America/New_York"
});
var london_time = date.toLocaleString("en-GB", {
  timeZone: "Europe/London"
});
var pakistan_time = date.toLocaleString("en-GB", {
  timeZone: "Asia/Karachi"
});
var nigeria_time = date.toLocaleString("en-GB", {
  timeZone: "Africa/Lagos"
});
document.querySelector(".nigeriaTime").textContent = nigeria_time.split(", ")[1];
document.querySelector(".pakistanTime").textContent = pakistan_time.split(", ")[1];
document.querySelector(".londonTime").textContent = london_time.split(", ")[1];
document.querySelector(".ESTTime").textContent = EST_time.split(", ")[1];