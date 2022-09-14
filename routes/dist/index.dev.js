"use strict";

var express = require('express');

var router = express.Router();

var fetch = require('node-fetch');

var fs = require('fs');

var _require = require("csv-parse"),
    parse = _require.parse;

var Analytics = require("../model/analytics");

var builder = require('xmlbuilder');
/* GET home page. */


router.get("/", function _callee(req, res) {
  var response, data, _data$current, condition, temp_c;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("http://api.weatherapi.com/v1/current.json?key=8e8e62aada5242bcb24114706221409&q=Lagos&aqi=no"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;
          _data$current = data.current, condition = _data$current.condition, temp_c = _data$current.temp_c;
          res.render("index", {
            image: condition.icon,
            temp: temp_c
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/v1/weather", function _callee2(req, res) {
  var response, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("http://api.weatherapi.com/v1/current.json?key=8e8e62aada5242bcb24114706221409&q=lagos&aqi=no"));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context2.sent;
          res.send(data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
var data = [];
fs.createReadStream("".concat(__dirname, "/../airports.csv")).pipe(parse({
  delimiter: ",",
  from_line: 2
})).on("data", function (airport) {
  data.push(airport);
});
router.get("/api/airports", function _callee3(req, res) {
  var search, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          search = req.query.search;
          response = data.filter(function (airport) {
            return airport.includes(search);
          });
          res.send(response);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //create analytics

router.get("/analytics/:widget_name/:browser_type", function _callee4(req, res) {
  var _req$params, widget_name, browser_type, data;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, widget_name = _req$params.widget_name, browser_type = _req$params.browser_type;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Analytics.create({
            widget_name: widget_name,
            browser_type: browser_type
          }));

        case 3:
          data = _context4.sent;
          res.json({
            click_count: data.dataValues.id
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //export analytics

router.get("/export/analytics", function _callee5(req, res) {
  var dirPath, analytics, xml, i, xmldoc;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          dirPath = __dirname + "/../public/xmlfiles/analytics.xml";
          _context5.next = 3;
          return regeneratorRuntime.awrap(Analytics.findAll());

        case 3:
          analytics = _context5.sent;
          xml = builder.create('analytics');

          for (i = 0; i < analytics.length; i++) {
            xml.ele('analytic').ele('id', analytics[i]['id']).up().ele('widget_name', analytics[i]['widget_name']).up().ele('browser_type', analytics[i]['browser_type']).up().ele('createdAt', analytics[i]['createdAt']).up();
          }

          xmldoc = xml.toString({
            pretty: true
          });
          fs.writeFile(dirPath, xmldoc, function (err) {
            if (err) {
              return console.log(err);
            }

            res.send({
              message: "success"
            });
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});