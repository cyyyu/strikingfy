// owner: chengxuan

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

  let score1 = calculator.checkTitle(title)
  let score2 = calculator.checkKeywords(keywords)
  let score3 = calculator.checkDescription(description)

  console.log('score:', 100 - (score1 + score1))
}