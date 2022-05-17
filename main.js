const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hi7lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);
	//console.log("Name: ",user.name)
	if (user == "invalid password"){
        return res.status(404).send("Wrong password")
    }
    else if(user == "No such document"){
        return res.status(404).send("Username not existed")
    }
    else{
        return res.status(200).send("login successful!")
    }


})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password,req.body.name,req.body.staff_id,req.body.phonenumber);
	if (User == "username already existed"||User == "staff id already existed"){
		return res.status(404).user("user duplicate!")		
	}

	return res.status(200).send("user successfully saved.")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
