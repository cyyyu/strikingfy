const app = require('express')()
const calculate = require('./score-system/evaluation')
const path = require('path')

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/dist/:file', function(req, res) {
  res.sendFile(path.resolve(__dirname, `./dist/${req.params.file}`))
})

app.get('/score', function(req, res) {
  let url = req.query.url
  calculate(url).then((re) => {
    res.send(Object.assign({
      status: 200
    }, re))
  }, () => {
    // network error
    res.send({
      status: 404,
    })
  })
})

app.listen(6789, function() {
  console.log('server start')
})

process.on('uncaughtException', function(err) {
  console.log('err', err)
})