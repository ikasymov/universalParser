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

router.post('/', async function (req, res, next) {
  let a = new events.NewMessage(req);
  if (req.body.event === 'message/new'){
    await a.start();
    console.log('hi')
    res.end()
  }else{
    res.end()
  }

  // try{
  //   let eventsObject = new dict[req.body.event](req);
  //   await eventsObject.start();
  // }catch(e){
  //   throw e
  // }
});

module.exports = router;
