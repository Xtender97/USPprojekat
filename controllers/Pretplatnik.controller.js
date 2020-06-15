const Pretplatnik = require('../models/Pretplatnik');

exports.add = (req, res) => {
    var pretplatnik = {
        email: req.body.email,
        opstina: req.body.opstina
    };
    console.log(req);

    Pretplatnik.create(pretplatnik).then(
        pretplatnikDB => {
            res.status(200).json({
                message: 'Successfully added pretplatnik',
                err: null
            })
        }
    ).catch(err => {
        res.status(500).json({
            message: 'Failed to add pretplatnik',
            error: err
        })
    })
}
