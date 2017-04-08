// owner: chengxuan

// const inputURL = 'http://www.jameslovesrose.com/'
const inputURL = 'http://libo.sxl.cn/'
const request = require('request')
const cheerio = require('cheerio')
const calculator = require('./score-calculation.js')

request(inputURL, function(error, response, body) {
  parseHTML(body)
})

function parseHTML(html) {

  const $ = cheerio.load(html)
  const title = $('title').text()
  const keywords = $('meta[name="keywords"]').attr('content')
  const description = $('meta[name="description"]').attr('content')


  const favicon = $('link[rel="shortcut icon"]').attr('href')
  const shareIcon = $('link[rel="apple-touch-icon"][sizes="76x76"]').attr('href')

  const baiduVerification = html.indexOf("<meta name=\"baidu-site-verification") > -1 
  const googleVerfication = html.indexOf("analytics_tracker") > -1 

  console.log(baiduVerification)
  console.log(googleVerfication)

  let score1 = calculator.checkTitle(title)
  let score2 = calculator.checkKeywords(keywords)
  let score3 = calculator.checkDescription(description)
  let score4 = calculator.checkFavicon(favicon)
  

  console.log('score:', 100 - (score1 + score1 + score3 + score4))
}