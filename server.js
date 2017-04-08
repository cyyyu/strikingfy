const app = require('express')()
const calculate = require('./score-system/evaluation')
const path = require('path')

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/dist/:file', function(req, res) {
  res.sendFile(path.resolve(__dirname, `./dist/${req.params.file}`))
})

app.get('/score/:url', function(req, res) {
  let url = req.params.url
  calculate(url).then((score) => {
    res.send({
      status: 200,
      totalScore: score,
      aspect: [],
    })
  }, () => {
    // network error
    res.send({
      status: 404,
      score: score
    })
  })
})

app.listen(6789, function() {
  console.log('server start')
})