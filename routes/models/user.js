const {mongoose} = require('../db/mongoose')
const validator = require('validator')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        },
        message: '{VALUE} is not a valid email'
    },
    createdAt: { type: Date}
})

const User = mongoose.model('User', UserSchema);
module.exports = {User}