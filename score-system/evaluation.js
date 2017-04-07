// owner: chengxuan

var inputURL = 'http://libo.sxl.cn/';
var request = require('request')
var cheerio = require('cheerio')
var htmlBody;

request(inputURL, function (error, response, body) {
  	parseHTML(body);
});

function parseHTML(html){

	const $ = cheerio.load(html);
	console.log($('title').text());
}