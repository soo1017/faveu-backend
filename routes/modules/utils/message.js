const {getDateAndTime} = require('./getDateAndTime')

const generateMessage = (username, customId, message) => {
    return {
        // name: username,
        message: message,
        customId: customId,
        // avatar, 
        createdAt: getDateAndTime(new Date())
    }
}

module.exports = {generateMessage}