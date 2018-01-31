const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let uptime = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .setTitle('Uptime')
        .addField('From: uptimerobot.com', 'https://stats.uptimerobot.com/mYNq3I2JB')
        addFooter(uptime, bot, message, command, args);
        message.channel.send(uptime);
}

module.exports.help = {
    names: ['uptime', 'up'],
    usage: 'b-uptime',
    description: 'Get my uptime info'
}