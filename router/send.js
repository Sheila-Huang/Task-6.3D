var nodemailer = require("nodemailer");
//mainWindow = new BrowserWindow({show: false,width: 1041, height: 650, minWidth: 1041, minHeight: 650,title:'change', center:true, resizable: true,webPreferences:{nodeIntegration:true}})


var transporter= nodemailer.createTransport({
    //port:465,
    // host:"smtp.gmail.com",
    // secureConnection: false,
    // requireTLS:true,
    service:'Gmail',
  auth: {
    user: 'assieKomm@gmail.com',
    pass: 'H1@assie'
  }

});


  // transporter.verify(function(error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Server is ready to take our messages");
  //   }
  // });
 
exports.send = function(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  }



