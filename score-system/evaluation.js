// owner: chengxuan

// const inputURL = 'http://www.jameslovesrose.com/'
// const inputURL = 'http://libo.sxl.cn/'
const inputURL = 'http://roselike.win'
const request = require('request')
const cheerio = require('cheerio')
const calculator = require('./score-calculation.js')
  // module.exports = 
function caclculate(url) {
  return new Promise((resolve, reject) => {
    var beforeLoad = new Date()
    request(inputURL, function(error, response, body) {
      try {
        let results = parseHTML(body)
        var afterLoad = new Date()
        var calculatedTime = afterLoad - beforeLoad
        console.log(calculatedTime / 1000)
        resolve(results)
      } catch (err) {
        reject(err)
      }
    })

    function parseHTML(html) {

      const $ = cheerio.load(html)
      const title = $('title').text()
      const keywords = $('meta[name="keywords"]').attr('content')
      const description = $('meta[name="description"]').attr('content')


      const favicon = $('link[rel="shortcut icon"]').attr('href')
      const shareIcon = $('link[rel="apple-touch-icon"][sizes="76x76"]').attr('href')

      const baiduVerification = html.indexOf("<meta name=\"baidu-site-verification") > -1
      const googleVerfication = html.indexOf("<meta name=\"google-site-verification\" content=") > -1

      console.log('baidu', baiduVerification)
      console.log('google', googleVerfication)

      let imgList = []
      $('img').each(function(){
        imgList.push(($(this).attr('src')))
      });

      
      let result = calculator.calculate(title, keywords, description, favicon, shareIcon, baiduVerification, googleVerfication)

      return result
    }
  })
}

caclculate(inputURL)