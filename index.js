const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { prefix } = require('./data/config.json');
require("dotenv").config()

const client = new Client({
    intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ] //,
        //partials: ["CHANNEL"]
});
client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
    
 // ===== TEMPOLARY SPECIAL FILE SEARCHING =====
 // - it search for commands in ./commands/Fun/Images since the code above dont support 2nd folder step.
    const funImageDirectory = "./commands/Fun/Images";
    try 
    {
        if (fs.existsSync(funImageDirectory)) 
        {
            console.log("Image directory exists")
            const funImagesFile = fs.readdirSync(funImageDirectory).filter(file => file.endsWith('.js'));
            for (const file of funImagesFile) 
            {
                const specialCommand = require(`${funImageDirectory}/${file}`);
                client.commands.set(specialCommand.name, specialCommand);
            }
        } 
    }
    catch(error)
    {
        console.log("Cannot find Images directory:\n" + error);
    }
}


client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(`YOU`, {
        type: "WATCHING",
    });
});


client.login(process.env.TOKEN)

client.on('messageCreate', message => {
    // === All the autoresponders ==
        if (message.content.toLowerCase() === 'hi') 
            return message.reply('Hi :)');
        
    
    // === Message and command handler ====
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if (!command) return;
    
        try {
            return command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            const ErrorEmbed = new Discord.MessageEmbed()
                .setColor("#ffb7c5")
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .addFields({ name: "ERR!", value: "Oops! I can't execute this command!" }, );
            return message.reply({ embeds: [ErrorEmbed] });
        }
    });
    