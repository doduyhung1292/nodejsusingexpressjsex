const pug = require('pug');
const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', function (req, res) {
	res.render('index', {
		name: 'Đốm ngáo'
	});
});
var users = [
		{ id:1, name: 'hung' },
		{ id:2, name: 'pii' }
		]
app.get('/users', function(req, res){
	res.render('users/index', {
		userslist: users

	});
});

app.get('/users/search', function (request, response){
	var q = request.q;
	var matchUser = users.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	response.render('users/index', {
		users: matchUser
	})
});



app.listen(port, function () {
	console.log(`Example app listening on port` + port)
});