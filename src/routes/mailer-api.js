const nodemailer = require('nodemailer');

const api = {};
const transport = {
    //all of the configuration for making a site send an email.
  
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(transport);
  transporter.verify((error, success) => {
    if(error) {
      //if error happened code ends here
      console.error(error)
    } else {
      //this means success
      console.log('Почтовый сервис к работе готов!...')
    }
  });

  api.POST = () => (req,res, next) => {  
    //make mailable object
    const mail = {
      from: "Вит-Ко 😎: " + process.env.SMTP_USER,
      to: 'kovalenkonikola@yandex.ru',
      subject: req.body.subject,
      text: `
      От: ${req.body.name} 

      Телефон: ${req.body.phone}

      Вопрос: ${req.body.question}`
    };
    transporter.sendMail(mail, (err,data) => {
      if(err) {
        res.json({
          message: 'Email не отправлен, проблемы...'
        })
      } else {
        res.json({
          message: 'Email отправлен успешно...'
        })
      }
    });
  };

//still inside the .post request the next line should be });

console.log("Из mailer-api...");

//module.exports = sendMailerRouter;
module.exports = api;