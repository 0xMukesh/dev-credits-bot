const axios = require('axios')

module.exports = {
    name: 'getCredits',
    description: 'Check your dev credits',
    aliases: ['gc'],

    execute(message, args) {
        axios.get(`https://devcredits-api.herokuapp.com/get/${message.mentions.users.first().id}`).then(async response => {
            try {
                message.reply(`<@${message.mentions.users.first().id}> have ${response.data[0].credits} dev credits 🪙`)
            } catch (e) {
                message.reply(`<@${message.mentions.users.first().id}>, smh dumb dev`)
            }
        })
    },
};