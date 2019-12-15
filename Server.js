// Import packages
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// App
const app = express()
// Morgan
//app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ 
    extended: true
  })
)

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Send POST with JSON format:{"address":{"colorKeys":["A","G","Z"],"values":[-20,4]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}} '})
})



// Starting server
app.listen(process.env.PORT || 5000)