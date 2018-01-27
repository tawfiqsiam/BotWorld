const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
    if(message.author.username=='NicksWorld'){
        message.channel.send('Killing processes...').then(process.exit());
    }
}

module.exports.help = {
    names: ['restart'],
    usage: 'e-restart',
    description: 'Restart me'
}