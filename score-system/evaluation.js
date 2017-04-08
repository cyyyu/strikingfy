// owner: chengxuan

// const inputURL = 'http://www.jameslovesrose.com/'
const inputURL = 'http://libo.sxl.cn/'
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
        console.log(calculatedTime/1000)
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
      const googleVerfication = html.indexOf("analytics_tracker") > -1

      const images = $('img').attr('src')
      console.log(images.length);

      for (i=0;i<images.length;i++){
        console.log(images[i].getText())
      }
      
      let result = calculator(title, keywords, description, favicon, shareIcon, baiduVerification, googleVerfication)

      return result
    }
  })
}

caclculate(inputURL)