var express = require('express');
var db = require('../db.js');
var router = express.Router();

const TokenValidator = require('twilio-flex-token-validator').validator;

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-FlexToken, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router.get('/', function(req, res, next) {
    TokenValidator(req.header('X-FlexToken'), process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
        .then(tokenResult => {
            db.getNote()
                .then(notes => res.json({notes: notes}))
                .catch(function(err) {
                    res.status(400).json(err.message);
                })
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

router.post('/', function(req, res, next) {
    TokenValidator(req.header('X-FlexToken'), process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
        .then(tokenResult => {
            var notes = req.body.notes;
            db.updateNote(notes)
                .then(() => res.sendStatus(200))
                .catch(function(err) {
                    res.status(400).json(err.message);
                })
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

module.exports = router;