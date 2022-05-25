const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    nev: String,
    username: String,
    szuletesiIdo: Date,
    egyenleg: Number,
    jelszo: String
});

module.exports = User;