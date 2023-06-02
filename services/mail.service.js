const sgMail = require('@sendgrid/mail')
const { env } = require('../db/constant')

const API_KEY = (env.SEND_GRID_KEY)

sgMail.setApiKey(API_KEY)
module.exports = {
    send: (to,subject,htmlTemplate) => {
        const message = {
            to: to,
            from: {
                Name: "POPT",
                Email: env.SEND_GRID_EMAIL_ID
            },
            subject: subject,
            html: htmlTemplate
        }
        sgMail.send(message)
            // eslint-disable-next-line no-unused-vars
            .then((response) => console.log("Email sent"))
            // eslint-disable-next-line no-unused-vars
            .catch((error) => console.log("Mail Error.......",error))
    }
}