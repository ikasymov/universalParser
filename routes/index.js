var express = require('express');
var router = express.Router();
let nambaone = require('nambaonebot');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//
router.post('/', async function (req, res, next) {
  try{
    
    nambaone.NewMessage.prototype.start = async function(){
      this.sendMessage('Hello world')
    };
    let config = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODg4MzI2NzQxLCJwaG9uZSI6IjYwMTgiLCJwYXNzd29yZCI6IiQyYSQxMCRyMjFwa1BYQ21MZzBsLmN3UjdNN2QuS0w4RDF3eURIQlowUkZ5L29DdWszN0l6WU1qSnQyRyIsImlzQm90Ijp0cnVlLCJjb3VudHJ5Ijp0cnVlLCJpYXQiOjE1MTA2MzkwMTN9.aDrfTpbJeY89iXMXW-9HD3LpIn76Y7A7-eZjzG3VBdM',
      nambaOne: 'https://api.namba1.co',
      bot_name: 'Универсальный'
    };
    return await nambaone.start(req, config)
  }catch(e){
    console.log(e)
  }
});

module.exports = router;
