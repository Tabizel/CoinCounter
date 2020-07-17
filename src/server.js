const express = require('express')
const app = express()
const path = require('path')
const nunjucks = require('nunjucks')
const convert = require('../lib/convert')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

nunjucks.configure('src/views/', {
  express: app,
  noCache: true
})

app.get('/', (req, res) => {
  res.render('home.html')
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query
  if (cotacao && quantidade > 0) {
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao.html', {
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao),
    })
  } else {
    res.render('cotacao.html', {
      error: 'Valores inválidos'
    })
  }
})

app.listen(3000, err => {
  if (err) {
    console.log('Não foi possível iniciar')
  } else {
    console.log('CoinCounter iniciado')
  }
})