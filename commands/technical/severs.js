const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    return message.channel.send(`I am in ${bot.guilds.size} servers :D`);
}

module.exports.help = {
    names: ['servers'],
    usage: 'b-servers',
    description: 'Get the number of servers I am in'
}