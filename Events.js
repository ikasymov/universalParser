let Step = require('./steps');

function NewMessage(req){
  Step.apply(this, arguments);
  this.content = this.data.content;
  this.sender_id = this.data.sender_id;
  this.chat_id = this.data.chat_id;
}

NewMessage.prototype = Object.create(Step.prototype);
NewMessage.prototype.constructor = NewMessage;

NewMessage.prototype.start = async function(){
  try{
    let lastMethodName = await this.lastMethod(this.sender_id);
    if(!lastMethodName){
      return await this.default();
    }
    let result = await this[lastMethodName]();
    await this.setNextMethod(this.sender_id);
    return result
  }catch(e){
    if(e.name instanceof TypeError){
      return await this.default();
    }
    throw e
  }
};

NewMessage.prototype.startMessage = async function(){
  return await this._sendMessage('Hello world', this.chat_id)
};

function UpdateMessage(req){
  NewMessage.apply(this, arguments)
}

UpdateMessage.prototype = Object.create(NewMessage.prototype);
UpdateMessage.prototype.constructor = UpdateMessage;


function UserFollow(req){
  Step.apply(this, arguments);
  this.sender_id = this.data.id
}

UserFollow.prototype = Object.create(Step.prototype);
UserFollow.prototype.constructor = UserFollow;


module.exports.new_message = NewMessage;
module.exports.update_message = UpdateMessage;
module.exports.user_follow = UserFollow;