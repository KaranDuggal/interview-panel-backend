const sgMail = require('@sendgrid/mail')
const { env } = require('../db/constant')

const API_KEY = ('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')

sgMail.setApiKey(API_KEY)
module.exports = {
    send: () => {
        const message = {
            to: "test11@yopmail.com",
            from: {
                Name: "POPT",
                Email: env.Email
            },
            subject: "hello from sendgrid",
            text: "hello world 88899999999",
            html: '<h1>Hello World</h1>'

        }
        sgMail.send(message)
            // eslint-disable-next-line no-unused-vars
            .then((response) => console.log("Email sent"))
            // eslint-disable-next-line no-unused-vars
            .catch((error) => console.log("error......."))
    }
}