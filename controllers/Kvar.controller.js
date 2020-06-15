const Kvar = require('../models/Kvar');
const Pretplatnik = require('../models/Pretplatnik');

const nodemailer = require('nodemailer')

exports.add = (req, res) => {
    const kvar = req.body;

    Kvar.create(kvar).then((kvarDB) => {

        Pretplatnik.findAll({
            where: {
                opstina: kvar.opstina
            },
            attributes: ['email']

        }).then((users) => {
            console.log(users);
            datum = new Date(kvar.datumkraja);
            var emails= [];
            users.forEach((user) => {
                emails.push(user.email)
            })
            const output = `
            <h1>Obavestenje</h1>
            <p>Dragi korisnice obavestavamo Vas da je doslo do kvara na lokaciji ${kvar.lokacija} u opstini ${kvar.opstina}. Ocekivano vreme zavrsetka radova je ${datum.toLocaleString()}!</p>
            `;

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
                from: '"ESJP" <elektronskiservis.esjp@gmail.com>', // sender address
                to: emails, // list of receivers
                subject: 'Obavestenje o kvaru', // Subject line
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
        })

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