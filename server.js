const app = require('express')()

app.get('/', function(req, res) {
  res.send('hello world')
})

app.post('/calculate', function(req, res) {
  res.send('')
})

app.listen(6666)