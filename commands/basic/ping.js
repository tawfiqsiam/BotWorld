const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message){
    let ping = new Discord.RichEmbed()
    .setColor('#50BB7C')
    .setTitle(':ping_pong: Pong!')
    .addField('My ping is:', (new Date().getTime() - message.createdTimestamp) + ' ms');
    message.channel.send(ping);
}

module.exports.help = {
    names: ['ping'],
    usage: config.prefix + 'ping',
    description: 'Ping me to see if i\'m awake :D'
}