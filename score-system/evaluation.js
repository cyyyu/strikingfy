// owner: chengxuan

var inputURL = 'http://libo.sxl.cn/';
var request = require('request')
var cheerio = require('cheerio')
var calculator = require('./score-calculation.js')
var htmlBody;

request(inputURL, function (error, response, body) {
  	parseHTML(body);
});

function parseHTML(html){

	const $ = cheerio.load(html);
	var title = $('title').text();
	var keywords = $('meta[name="keywords"]').attr('content');
	var description = $('meta[name="description"]').attr('content');
	console.log(title)
	console.log(keywords)
	console.log(description)

	// let score1 = calculator.checkTitle(title)
	// let score2 = calculator.checkKeyWord(keywords)
}