let db = require('./models');
let events = require('./Events');
let config = require('./config');
let request = require('request');

function Step(req, event){
  this.req = req;
  this.event = req.body.event;
  this.data = req.body.data;
  this.apiUrl = config.apiUrl
}

Step.prototype.lastMethod = async function(user_id){
  try{
    let user = await db.User.findOne({
      where:{
        sender_id:user_id
      },
      include:[{
        model: db.Step
      }]
    });
    if(user === null){
      console.log('user not exist');
      throw new Error('user not exist')
    }
    return user.step.func_name || false;
  }catch(e){
    throw e
  }
};


Step.prototype.start = async function(){
  return this.default();
};


Step.prototype.setNextMethod = async function(sender_id){
  let user = await db.User.findOne({
    where:{
      sender_id: sender_id
    },
    include: [{
      model: db.Step
    }]
  });
  if(user !== null){
    let nextFunction = user.step[user.step_id].id;
    await user.update({step_id:nextFunction});
    return true
  }else{
    throw new Error('user not exist')
  }
};


Step.prototype._sendMessage = async function(message, chat_id){
  const data = {
    url: this.apiUrl + '/chats/' + chat_id + '/write',
    method: 'POST',
    body: {
      type: 'text/plain',
      content: message
    },
    headers: {
      'X-Namba-Auth-Token': config.token
    },
    json: true
  };
  return new Promise((resolve, reject)=>{
    request(data, (error, req, body)=>{
      if(error){
        reject(error)
      }
      resolve(body)
    })
  })
};


Step.prototype.default = async function(){
  console.log('not found this method');
  throw new Error('not found this method')
};


module.exports = Step;