const outlook = require('nodejs-nodemailer-outlook');

const sendEmail = (sender, password, receiver, subject, HTMLMessage, textMessage, errCallback = console.error, successCallback = console.log) => {
    outlook.sendEmail({
        auth: {
            user: `${sender}`,
            pass: `${password}`
        },
        from: `${sender}`,
        to: `${receiver}`,
        subject: `${subject}`,
        html: `${HTMLMessage}`,
        text: `${textMessage}`,
        replyTo: `${sender}`,
        onError: (e) => errCallback(e),
        onSuccess: (i) => successCallback(i)
    });
}

module.exports = sendEmail;
