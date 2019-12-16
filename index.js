// Import packages
const express = require('express')

const bodyParser = require('body-parser')
// App
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ 
    extended: true
  })
)

// First route
app.get('/', (req, res) => {
    res.json({ message: 'AutoDeployment enabled2! Send POST with JSON format:{"address":{"colorKeys":["A","G","Z"],"values":[-20,4]},"meta":{"digits":33,"processingPattern":"d{5}+[a-z&$§]"}} '})
})

app.post('/', (req, res) => {
	isFailed = false
	try {        
		console.log(req.body.address.values[0]);
		console.log('JSON Parsing function...');
		//JSON.parse(req.body);
	
	} 
	catch (err) { 
		//console.log("Error : " + err);
		console.log('Wrong JSON format');
		res.status(404).send({'result':'Input not in the expected JSON format'});
		isFailed = true
	}
	if(!isFailed){
		var valueSum = 0;
		for(var i = 0; i < req.body.address.values.length; i++) {
			//console.log (req.body.address.values[i])
			
			try{
				value =  req.body.address.values[i]
				validValueToAdd =  parseInt(req.body.address.values[i])
				if( !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))){                   
					console.log(validValueToAdd)
					valueSum+=validValueToAdd
				}
				else{
					err2 = new error('Values node contain non numbers')
				}
			}
			catch(err2){
				console.log("Error : " + err2);
				console.log('non numbers format');
				res.status(404).send({'result':'Values node contains non numbers'});
			}
		}
		digitSum = calculateDigitSum(valueSum)
		res.json({'result':digitSum})
	}
})


function calculateDigitSum(valueSum) { 
	console.log('OK continue')
	 
	valueSum = Math.abs(valueSum) //neglecting negative sign
	digitSum = 0;
	while (valueSum) {       
		digitSum += valueSum % 10;
		valueSum = Math.floor(valueSum / 10);
	}
	return digitSum;
 }
// Starting server
app.listen(process.env.PORT || 5000)
