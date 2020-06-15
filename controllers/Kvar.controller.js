const Kvar = require('../models/Kvar');


exports.add = (req, res) => {
    const kvar = req.body;

    Kvar.create(kvar).then((kvarDB) => {

        res.status(200).json({
            message: "Successfully created kvar",
            data: kvarDB
        }
        )
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