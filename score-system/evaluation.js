// owner: chengxuan

// const inputURL = 'http://www.jameslovesrose.com/'
const inputURL = 'http://libo.sxl.cn/'
const request = require('request')
const cheerio = require('cheerio')
const calculator = require('./score-calculation.js')

module.exports = function caclculate(url) {
  return new Promise((resolve, reject) => {
    var beforeLoad = new Date()
    request(url, function(error, response, body) {
      try {

        var afterLoad = new Date()
        var calculatedTime = afterLoad - beforeLoad
        console.log(calculatedTime / 1000)
        parseHTML(body).then((results) => {
          resolve(results)
        })

      } catch (err) {
        reject(err)
      }
    })

    function parseHTML(html) {
      return new Promise((resolve, reject) => {
        const $ = cheerio.load(html)
        const title = $('title').text()
        const keywords = $('meta[name="keywords"]').attr('content')
        const description = $('meta[name="description"]').attr('content')


        const favicon = $('link[rel="shortcut icon"]').attr('href')
        const shareIcon = $('link[rel="apple-touch-icon"][sizes="76x76"]').attr('href')

        const baiduVerification = html.indexOf("<meta name=\"baidu-site-verification") > -1
        const googleVerfication = html.indexOf("analytics_tracker") > -1

        let result = calculator.calculate(title, keywords, description, favicon, shareIcon, baiduVerification, googleVerfication)

        // return result
        let imgList = []
        $('img').each(function() {
          let url = $(this).attr('src')
          if (url.indexOf('qnssl') > -1) {
            imgList.push(url)
          }
        });

        calculator.checkImages(imgList).then((scores) => {
          resolve({
            imageScores: scores,
            result: result
          })
        })
      })

    }
  })
}

// caclculate(inputURL)