const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let uptime = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .setTitle('Uptime')
        .addField('From: uptimerobot.com', 'https://stats.uptimerobot.com/mYNq3I2JB')
        .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
        message.channel.send(uptime);
}

module.exports.help = {
    names: ['uptime', 'up'],
    usage: 'e-uptime',
    description: 'Get my uptime info'
}