var fs = require('fs');
var Canvas = require('canvas');
var measureBlur = require('./measure_blur.js')
var image;
var http = require('http')

function createImage(error, data) {
  if (error) {
    console.error('Unable to read image file!');
    throw error;
  }
  image = new Canvas.Image;
  image.onload = drawImageOnCanvas;
  image.src = data;
}

function drawImageOnCanvas() {
  var canvas = new Canvas(),
    context;

  canvas.width = image.width;
  canvas.height = image.height;
  context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  return showBlurScore(context.getImageData(0, 0, canvas.width, canvas.height))
}

function showBlurScore(imageData) {
  var stats = measureBlur(imageData);
  return Number((stats.avg_edge_width_perc).toFixed(2))
    //   console.log('Blur score:', Number((stats.avg_edge_width_perc).toFixed(2)));
    //   console.log(stats);
}

module.exports = function(imageUrl) {
  return new Promise((resolve, reject) => {
    let rawData = [];
    http.get(process.argv[2], (res) => {
      res.on('data', (chunk) => {
        rawData.push(chunk)
      })
      res.on('end', () => {
        let buffer = Buffer.concat(rawData)
        resolve(createImage(null, buffer))
      })
      res.on('error', (err) => {
        reject(err)
      })
    })
  })
}