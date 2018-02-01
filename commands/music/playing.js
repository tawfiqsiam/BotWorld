const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    message.channel.send('**' + bot.queue[message.guild.id][0][0].title + '** Requested by: **' + queue[message.guild.id][0].from + '**');
}

module.exports.help = {
    names: ['command'],
    usage: 'b-command <args>',
    description: 'what?'
}