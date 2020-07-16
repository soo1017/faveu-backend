const mongoose = require('mongoose');
const {mongooseid} = require('../../config/config')

mongoose.Promise = global.Promise;
mongoose.connect(mongooseid.uri, mongooseid.option);

// mongoose.connect('mongodb://127.0.0.1:27017/faveutest', { useNewUrlParser: true });
// var option = { user: mongooseid.user, pass: mongooseid.pass };
// var uri = 'mongodb://54.212.247.86:27017/FaveU';

module.exports = {mongoose}