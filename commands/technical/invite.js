const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let invite = new Discord.RichEmbed()
        .addField('Link', 'https://discordapp.com/oauth2/authorize?client_id=404762043527462922&scope=bot&permissions=8')
        .setColor('#50BB7C')
        addFooter(invite, bot, message, command, args);
        return message.channel.send(invite);
}

module.exports.help = {
    names: ['invite'],
    usage: 'b-invite',
    description: 'Invite me to your server'
}