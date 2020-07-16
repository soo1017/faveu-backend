const {toTitleCase} = require('./toTitleCase')

const users =[]

const addUser = ({id, name, customId, room}) => {
    name = toTitleCase(name.trim())
    room = room.trim()
    customId = customId.trim()

    //validate the data
    if (!name || !room ) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for extisting user
    const existingUser = users.find((user) => {
        return user.room === room && user.name === name
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, name, customId, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)
    }
}

const getUser = (id) => {
    return users.find((user) => users.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}