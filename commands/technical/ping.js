const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
        let ping = new Discord.RichEmbed()
        .setColor('#50BB7C')
        .setTitle(':ping_pong: Pong!')
        .addField('Time', (new Date().getTime() - message.createdTimestamp) + ' ms')
        addFooter(ping, bot, message, command, args);
        return message.channel.send(ping);
}

module.exports.help = {
    names: ['ping'],
    usage: 'b-ping',
    description: 'Check my ping'
}