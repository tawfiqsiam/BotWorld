const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const ytdl = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(args[0]=='join'){
        message.guild.members.get(message.author.id).VoiceChannel.join();
    }
}

module.exports.help = {
    names: ['command'],
    usage: 'e-command <args>',
    description: 'what?'
}