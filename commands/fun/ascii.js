const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const figlet = require('figlet');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    figlet(args.join(' '), function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        message.channel.send("```" + data + "```")
    });
}

module.exports.help = {
    names: ['ascii'],
    usage: 'b-ascii <text>',
    description: 'funny text...'
}