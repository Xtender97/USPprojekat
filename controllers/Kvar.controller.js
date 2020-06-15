const Kvar = require('../models/Kvar');
const nodemailer = require('nodemailer')

exports.add = (req, res) => {
    const kvar = req.body;

    Kvar.create(kvar).then((kvarDB) => {

        //send email 
        const output = `<h1>Naslov</h1>`;
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com.',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'elektronskiservis.esjp@gmail.com', // generated ethereal user
                pass: 'Sifra123'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Nodemailer Contact" <elektronskiservis.esjp@gmail.com>', // sender address
            to: 'jovbosko1@gmail.com', // list of receivers
            subject: 'Node Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.status(200).json({
                message: "Successfully created kvar",
                data: kvarDB
            }
            )
        });


    }).catch((err) => {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    })

}

exports.getAll = (req, res) => {
    Kvar.findAll().then(
        kvarovi => {
            res.status(200).json({
                message: 'Successfully fetched kvarove',
                data: kvarovi
            })
        }
    ).catch((err) => {
        res.status(500).json({ message: 'Internal server error', error: err })
    })
}