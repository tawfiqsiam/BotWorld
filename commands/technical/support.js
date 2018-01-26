const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let invite = new Discord.RichEmbed()
        .addField('Support server link', 'https://discordapp.com/invite/VVmeG9U')
        .setColor('#50BB7C')
        .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
        return message.channel.send(invite);
}

module.exports.help = {
    names: ['support']
}