var express = require('express');
var router = express.Router();
let events = require('../Events');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


let dict = {
  'message/new': events.NewMessage,
  'message/update': events.UpdateMessage,
  'user/follow': events.UserFollow,
};

router.post('/', function (req, res, next) {
  try{
    let eventsObject = new dict[req.body.event](req);
    eventsObject.start();
  }catch(e){
    throw e
  }
});

module.exports = router;
