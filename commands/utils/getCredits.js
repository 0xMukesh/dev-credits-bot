const Discord = require('discord.js')
const axios = require('axios')

const { catSmart, babyAngry } = require("../../utils/emojiList")

module.exports = {
    name: 'getCredits',
    description: 'Check your dev credits',
    aliases: ['gc'],

    execute(message, args) {
        axios.get(`https://devcredits-api.herokuapp.com/get/${message.mentions.users.first().id}`).then(async response => {
            try {
                const successEmbed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.mentions.users.first().id}> have ${response.data[0].credits} dev credits ${catSmart}`)
                    .setColor("#12AD2B")
                message.reply({ embeds: [successEmbed] })
            } catch (e) {
                if (e instanceof TypeError) {
                    const noCreditsEmbed = new Discord.MessageEmbed()
                        .setDescription(`<@${message.mentions.users.first().id}>, smh dumb dev ${babyAngry}`)
                        .setColor("#ED4245")
                    message.reply({ embeds: [noCreditsEmbed] })
                }
                else {
                    const rateLimitEmbed = new Discord.MessageEmbed()
                        .setDescription(`A random rate limit has been spawned ${babyAngry}`)
                        .setColor("#ED4245")
                    message.reply({ embeds: [rateLimitEmbed] })
                }
            }
        })
    },
};