var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
const { parse } = require("csv-parse");
const Analytics = require("../model/analytics");
const builder = require('xmlbuilder');

/* GET home page. */
router.get("/", async function (req, res) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=8e8e62aada5242bcb24114706221409&q=Lagos&aqi=no"
  );
  const data = await response.json();

  let { condition, temp_c } = data.current

  res.render("index", {
    image: condition.icon,
    temp: temp_c
  });
});

router.get("/v1/weather", async function (req, res) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=8e8e62aada5242bcb24114706221409&q=lagos&aqi=no"
  );
  const data = await response.json();

  res.send(data);
});

module.exports = router;

let data = [];
fs.createReadStream(`${__dirname}/../airports.csv`)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (airport) {
    data.push(airport);
  });


router.get("/api/airports", async function (req, res) {
  const { search } = req.query;
  const response = data.filter((airport) => airport.includes(search));
  res.send(response);
});

//create analytics
router.get("/analytics/:widget_name/:browser_type", async function (req, res,) {
  const { widget_name, browser_type } = req.params;
  const data = await Analytics.create({
    widget_name,
    browser_type
  });
  res.json({
    click_count: data.dataValues.id
  });
});

//export analytics
router.get("/export/analytics", async function (req, res,) {

  var dirPath = __dirname + "/../public/xmlfiles/analytics.xml";

  const analytics = await Analytics.findAll();
  var xml = builder.create('analytics');
  for (var i = 0; i < analytics.length; i++) {
    xml.ele('analytic')
      .ele('id', analytics[i]['id']).up()
      .ele('widget_name', analytics[i]['widget_name']).up()
      .ele('browser_type', analytics[i]['browser_type']).up()
      .ele('createdAt', analytics[i]['createdAt']).up()
  }

  var xmldoc = xml.toString({ pretty: true });
  fs.writeFile(dirPath, xmldoc, function (err) {
    if (err) { return console.log(err); }
    console.log("The file was saved!");
    res.send({
      message: "success"
    });
  });
});
