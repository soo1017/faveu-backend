const {mongoose} = require('../db/mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const {ObjectID} = require('mongodb')

var FaveuSchema = new mongoose.Schema({
    faveuname: { type: String, required: true, trim: true },
    faveuemail: { type: String, trim: true, lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    faveuphone: { type: String, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: { type: String, required: true, trim: true },
    useremail: { type: String, required: true, trim: true, lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    useravatar: { type: String, required: true, trim: true },
    userdeviceId: { type: String, trim: true, default: null },
    phonecountry: { type: String, trim: true },
    differentusername: { type: String, trim: true, default: 'no' },
    competitors: [{ name: { type: String, trim: true, required: true }, avatar: { type: String, trim: true, required: true }}],
    numofcompetitors: { type: Number, required: true },
    invitecard: { type: String, required: true, trim: true },
    os: { type: String, required: true, default: 'ios' },

    u2faveuemailsent: { type: Boolean, required: true, default: false },
    u2faveuSMSsent: { type: Boolean, required: true, default: false },
    u2faveupushsent: { type: Boolean, required: true, default: false },
    // u2faveulinkchecked: { type: Boolean, required: true, default: false },
    faveupushenabled: { type: Boolean, required: true, default: false },
    faveudeviceId: { type: String, trim: true, default: null },
    faveudeviceOS: { type: String, required: true, default: 'ios' },

    expired: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    selectionmade: { type: Boolean, required: true, default: false },
    success: { type: Boolean, required: true, default: false },
    userselected: { type: Boolean, required: true, default: false },
    selectedcompetitor: { type: String, trim: true },

    f2userpushsent: { type: Boolean, required: true, default: false },
    f2userpushsentAt: { type: Date },

    // Success case
    u2faveuloveemailsent: { type: Boolean, required: true, default: false },
    u2faveuloveSMSsent: { type: Boolean, required: true, default: false },
    u2faveulovepushsent: { type: Boolean, required: true, default: false },
    u2faveulovemessage: { type: String },

    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],

    completed: { type: Boolean, required: true, default: false },
    completedAt: { type: Date },
    processerror: [ {type: String, trim: true}],  // "faveuEmail", "faveuSMS", "faveuPush", "successEmail", "successSMS", "successPush", "linkPush"
    tokens: [{access: {type: String, required: true}, token: {type: String, required: true}}],

    createdAt: { type: Date },
});

// example based = methods
FaveuSchema.methods.toJSON = function () {
    var faveu = this;
    var faveuObject = faveu.toObject();
  
    return _.pick(faveuObject, ['_id', 'useremail']);
};

FaveuSchema.methods.generateAuthToken = function (userId) {
    var faveu = this;
    var access = 'auth';
    var token = jwt.sign({_id: faveu._id.toHexString(), access}, 'faveu444').toString();
    var id = new ObjectID(faveu._id);
    var created_time = id.getTimestamp();
    // var temp_userid = new Object(userId)
  
    faveu.tokens.push({access, token})
    faveu.createdAt = created_time
    faveu.userId = new Object(userId)
  
    faveu.save().then(() => {
    }, (e) => {});
};
  
// statics is model based
FaveuSchema.statics.findByToken = function (token) {
    var Faveu = this;
    var decoded;
  
    try {
        decoded = jwt.verify(token, 'faveu444');
    } catch (e) { return Promise.reject(); }
  
    return Faveu.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

// statics is model based
FaveuSchema.statics.findByTokenAndUpdate = function (token, newdata) {
    var Faveu = this;       // Faveu model
    var decoded;
  
    try {
        decoded = jwt.verify(token, 'faveu444');
    } catch (e) { return Promise.reject(); }
  
    return Faveu.findOneAndUpdate({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }, 
    {$set: newdata},
    // {useFindAndModify: false},
    {new: true})
};

const Faveu = mongoose.model('Faveu', FaveuSchema);
module.exports = {Faveu}


