const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(message.author.id=='292377829105205249'){
        message.channel.send('Killing processes...').then(process.exit());
    }
}

module.exports.help = {
    names: ['restart'],
    usage: 'b-restart',
    description: 'Restart me'
}