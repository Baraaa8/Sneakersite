const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phif7k', {useNewUrlParser: true});

module.exports = mongoose;