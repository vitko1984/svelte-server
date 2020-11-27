const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN, userId = process.env.TELEGRAM_UID;
const bot = new TelegramBot(token, { polling: true });

const api = {};

api.GET = () => (req, res, next) => {};
api.POST = () => (req, res, next) => {
  const fields = `
    ${req.body.subject}
    От: ${req.body.name} 
    Телефон: ${req.body.phone}

    ${req.body.question}`; 
  bot.sendMessage(userId, fields);
  bot.on('polling_error', (error) => {
    return res.status(400).json(error);
  });
  return res.status(200).json({ message: "Запрос успешно отправлен в Телеграм..." });      
};

console.log("Из telegram-api...");

module.exports = api;