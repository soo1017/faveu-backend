function createChatPushMessage(chat) {
    return "Your FaveU wants to chat with you. Please join the chat with the following info. user: " + chat.user[1].name + ", room: " + chat.room;
};
  
module.exports = {createChatPushMessage};