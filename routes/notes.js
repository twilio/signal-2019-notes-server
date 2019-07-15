var express = require('express');
var db = require('../db.js');
var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router.get('/', function(req, res, next) {
    db.getNote()
        .then(notes => res.json({notes: notes}))
        .catch(function(err) {
            res.status(400).json(err.message);
        })
});

router.post('/', function(req, res, next) {
    var notes = req.body.notes;
    db.updateNote(notes)
        .then(() => res.sendStatus(200))
        .catch(function(err) {
            res.status(400).json(err.message);
        })
});

module.exports = router;