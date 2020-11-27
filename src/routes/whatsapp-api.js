const Chapi = require('whatsapp-chapi');

const token = process.env.WHATSAPP_TOKEN, 
      apiUrl = process.env.WHATSAPP_URL, 
      chatId = process.env.WHATSAPP_INSTANCE_ID_HERE, 
      accauntPhone = process.env.WHATSAPP_ACCAUNT_PHONE;

const bot = new Chapi( chatId, token );
bot.signIn(accauntPhone);

const api = {};

api.GET = () => (req, res, next) => {};
api.POST = () => (req, res, next) => {
  const data = req.body;
  for (let i in data.messages) {
    const author = data.messages[i].author;
    const body = data.messages[i].body;
    const chatId = data.messages[i].chatId;
    const senderName = data.messages[i].senderName;

    if(data.messages[i].fromMe)return;
  };    
};

console.log("Из whatsapp-api...");

module.exports = api;