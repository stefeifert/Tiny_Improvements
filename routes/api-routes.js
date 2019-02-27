const User = require('../models/User');
const Kudo = require('../models/Kudos');

// const db = require('../models');

module.exports = function (app) {
    //user get route//
    app.get('/api/user', function (req, res) {
        User.find({})
            .populate('kudos')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //kudos get route//
    app.get('/api/kudos', function (req, res) {
        Kudo.find(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //kudos update route
    app.put('/api/kudos/:id', function (req, res) {
        Kudo.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // kudos delete route
    app.delete('/api/kudos/:id', function (req, res) {
        Kudo.findOneAndDelete({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });


    //kudos post route
    app.post('/api/kudos', function (req, res) {
        const usersId = req.body.usersId;
        const newEntry = {
            title: req.body.title,
            body: req.body.body,
            from: req.body.from,
            to: req.body.to
        }

        Kudo.create(newEntry)
            .then(function (kudosData) {
                return users.findOne({ _id: usersId }, { $push: { kudos: kudosData._id } }, { new: true });
            })
            .then(function (usersData) {
                res.json(usersData);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}