const {mongoose} = require('../db/mongoose')
const validator = require('validator')
const _ = require('lodash')

const ChatSchema = new mongoose.Schema({
    room: { type: String, required: true, trim: true },
    creatoremail: { type: String, trim: true, lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    user: [{name: {type: String, trim: true}, avatar: {type: String, trim: true}}],
    content: [{customId: { type: String, trim: true}, message: { type: String, trim: true}, createdAt: {type: String, trim: true}}],
    u2faveulovechatemailsent: { type: Boolean, required: true, default: false },
    u2faveulovechatSMSsent: { type: Boolean, required: true, default: false },
    u2faveulovechatpushsent: { type: Boolean, required: true, default: false},
    processerror: [ {type: String, trim: true} ],  //  "chatEmail", "chatPush", "chatSMS", "reverseChatPush", "reverseChatEmail"
    closed: { type: Boolean, required: true, default: false },
    createdAt: { type: Date }
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = {Chat}