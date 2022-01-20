const axios = require('axios')

module.exports = {
    name: 'postCredits',
    description: 'Give dev credits to someone',
    aliases: ['pc'],

    execute(message, args) {
        try {
            axios.post('https://devcredits-api.herokuapp.com/post', {
                id: message.mentions.users.first().id,
                credits: args[1]
            })
            message.reply("ok done")
        } catch (e) {
            message.reply("ummm.. an error occurred")
        }
    },
};