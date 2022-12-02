const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    try{
        const transporter = nodemailer.createTransport({
            service:"Gmail",
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
          })
        
          const mailOptions = {
            from: 'Ankit Prasad <ankdev.251@gmail.com',
            to: options.email,
            subject: options.subject,
            text: options.message,
          }
        
          await transporter.sendMail(mailOptions)
    }catch(error){
        console.log(error);
    }
}

module.exports = sendEmail