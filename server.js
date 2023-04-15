const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 4200
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  try {
    res.render('index')
  } catch (error) {
    res.status(500).json(error.message)
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
