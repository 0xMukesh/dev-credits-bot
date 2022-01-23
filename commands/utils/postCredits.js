const Discord = require('discord.js')
const axios = require('axios')

const { catSmart, rooCry, babyAngry } = require('../../utils/emojiList')

module.exports = {
    name: 'postCredits',
    description: 'Give dev credits to someone',
    aliases: ['pc'],

    execute(message, args) {
        try {
            if (typeof (args) === "number") {
                axios.post('https://devcredits-api.herokuapp.com/post', {
                    id: message.mentions.users.first().id,
                    credits: args[1]
                })
                const successEmbed = new Discord.MessageEmbed()
                    .setDescription(`okie dokie, I have given <@${message.mentions.users.first().id}> ${args[1]}`)
                message.reply({ embeds: [successEmbed] })
            }
            else {
                const notNumberErrorEmbed = new Discord.MessageEmbed()
                    .setDescription(`Dev credits can only be in number and not any other random shit ${babyAngry}`)
                message.reply({ embeds: [notNumberErrorEmbed] })
            }
        } catch (e) {
            const errorEmbed = new Discord.MessageEmbed()
                .setDescription(`A random rate limit has been spawned ${babyAngry}`)
            message.reply({ embeds: [errorEmbed] })
        }
    },
};