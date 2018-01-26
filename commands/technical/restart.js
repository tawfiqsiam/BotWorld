const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
    if(message.author.username=='NicksWorld'){
        message.channel.send('Killing processes...');
        process.exit(0);
    }
}

module.exports.help = {
    names: ['command']
}