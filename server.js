const express = require('express')
const app = express()
const path = require('path');
const port = 4200
app.use(express.static(path.join(__dirname, 'public')));
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
