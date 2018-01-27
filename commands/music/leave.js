const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    message.guild.members.get(message.author.id).voiceChannel.leave();
    message.channel.send('Left: ' + message.guild.members.get(message.author.id).voiceChannel.name);
}

module.exports.help = {
    names: ['join'],
    usage: 'e-command <args>',
    description: 'what?'
}