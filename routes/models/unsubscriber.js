const {mongoose} = require('../db/mongoose')
const validator = require('validator')
const _ = require('lodash')

const UnsubscriberSchema = new mongoose.Schema({
    email: { type: String, trim: true, lowercase: true, required: true,
        validate: (value) => {
            return validator.isEmail(value)
        },
        message: '{VALUE} is not a valid email'
    },
    phone: { type: String, trim: true },
    createdAt: { type: Date }
})

const Unsubscriber = mongoose.model('Unsubscriber', UnsubscriberSchema)
module.exports = {Unsubscriber}