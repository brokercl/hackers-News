function sendEmail(newPassword) {

var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    user: 'brokercl@gmail.com',
    pass: 'kiyohabit59720181' 
  }
});

var emailMessage = '<h1 style="background-color:DodgerBlue;">From Covitest App</h1><br>' +
                  '<h2 style="color:Tomato;">Dear User: <br>' +
                  '<h2 style="color:Tomato;">your new password has been update to: </h2> ' + 
                  '<h2 style="color:MediumSeaGreen;">' + newPassword + '</h2><br>' +
                  '<h2 style="color:Tomato;">please dont reply to this email !</h2><br>' +
                  '<h2 style="color:Tomato;">Have a nice day..</h2><br>'
 
var mailOptions = {
  from: 'brokercl@gmail.com',
  to: 'brokercl@gmail.com',
  subject: 'password changed it',
  html: emailMessage,
//  text: 'Have a nice day..'
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
}

module.exports = {
  sendEmail
}