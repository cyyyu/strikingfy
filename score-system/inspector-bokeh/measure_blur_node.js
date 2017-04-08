var fs = require('fs')
var Canvas = require('canvas')
var measureBlur = require('./measure_blur.js')
var image
var http = require('http')

module.exports = function(imageUrl) {
  return new Promise((resolve, reject) => {
    let rawData = []
    http.get(imageUrl, (res) => {
      res.on('data', (chunk) => {
        rawData.push(chunk)
      })
      res.on('end', () => {
        let buffer = Buffer.concat(rawData)
        image = new Canvas.Image
        image.onload = () => {
          var canvas = new Canvas(),
            context
          canvas.width = image.width
          canvas.height = image.height
          context = canvas.getContext('2d')
          context.drawImage(image, 0, 0)
          var stats = measureBlur(context.getImageData(0, 0, canvas.width, canvas.height))
          resolve(Number((stats.avg_edge_width_perc).toFixed(2)))
        }
        image.src = buffer
      })
      res.on('error', (err) => {
        reject(err)
      })
    })
  })
}