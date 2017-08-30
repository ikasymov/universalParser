let db = require('./models');

async function add(command){
  try{
    let list = command.split('|');
    let event = list[0];
    let functions = list[1].split('-');
    let arrayForCreate = [];
    await db.sequelize.transaction(async function(t){
      let eventObj = await db.Event.create({
        name: event
      }, {transaction: t});
      for (let i in functions){
        arrayForCreate.push({func_name: functions[i], event_id: eventObj.id})
      }
      await db.Step.bulkCreate(arrayForCreate, {transaction: t});
    });
    console.log('You added functions and events to steps')
  }catch(e){
    throw e
  }
}

add('message/new|startMessage').then(
    console.log('hi')
);