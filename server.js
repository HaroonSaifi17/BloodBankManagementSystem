const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const port = 4200
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'haroonsaifi',
    resave: false,
    saveUninitialized: true,
  })
)

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '00000000',
  database: 'blooddb',
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error)
  } else {
    console.log('Connected to MySQL database!')
  }
})

app.get('/', (req, res) => {
  try {
    res.render('blood/index')
  } catch (error) {
    res.status(500).json(error.message)
  }
})
app.get('/donorform', (req, res) => {
  try {
    res.render('blood/donorform')
  } catch (error) {
    res.status(500).json(error.message)
  }
})
app.post('/donorform', (req, res) => {
  try {

    connection.query(`INSERT INTO donors  (name, age, gender,blood_group, phone_number, email,address) VALUES ( '${req.body.name}', ${req.body.age}, '${req.body.gender}', '${req.body.blood_group}', '${req.body.phone_number}', '${req.body.email}','dumy address')`, (error, results1, fields) => {
      if (error) {
        console.error('Error querying database:', error)
      }
    res.render('blood/index')
    })
  } catch (error1) {
    res.status(500).json(error1.message)
  }
})
app.get('/adminlogin', (req, res) => {
  try {
    errorMessage = ''
    res.render('blood/adminlogin', { errorMessage })
  } catch (error) {
    res.status(500).json(error.message)
  }
})
app.post('/adminlogin', (req, res) => {
  if (req.body.username == 'Lareb' && req.body.password == '1234') {
    req.session.isAuthenticated = true
    res.redirect('/admindashboard')
  } else {
    const errorMessage = 'Invalid username or password'
    res.render('blood/adminlogin', { errorMessage })
  }
})
app.get('/admindashboard', (req, res) => {
  if (!req.session.isAuthenticated) {
    res.redirect('/adminlogin')
  } else {
    connection.query('SELECT blood_group,count(*) from blood_donations group by blood_group', (error, results1, fields) => {
      if (error) {
        console.error('Error querying database:', error)
      } else {
        let results = results1
    res.render('blood/admindashboard',{results})
      }
    })
  }
})
app.get('/admindonordetail', (req, res) => {
  if (!req.session.isAuthenticated) {
    res.redirect('/adminlogin')
  } else {
    connection.query('SELECT * from donors', (error, results1, fields) => {
      if (error) {
        console.error('Error querying database:', error)
      } else {
        let results = results1
    res.render('blood/admindonordetail',{results})
      }
    })
  }
})
app.get('/adminpatientdetail', (req, res) => {
  if (!req.session.isAuthenticated) {
    res.redirect('/adminlogin')
  } else {
    connection.query('SELECT * from recipients', (error, results1, fields) => {
      if (error) {
        console.error('Error querying database:', error)
      } else {
        let results = results1
    res.render('blood/adminpatientdetail',{results})
      }
    })
  }
})
app.get('/logout', (req, res) => {
    req.session.isAuthenticated = false
    res.redirect('/')

})

app.listen(process.env.PORT || port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
