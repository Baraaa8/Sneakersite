const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Shoes = db.model('Shoes', {
    nev: String,
    kep: String,
    hirdetve: {
        type: String,
        default: 'Nem'
    },
    ar: Number,
    _elado: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Shoes;