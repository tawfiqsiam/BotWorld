const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    message.guild.members.get(message.author.id).voiceChannel.leave();
    let leaveEmbed = new Discord.RichEmbed()
    .setColor('#BBEEEE')
    .addField('Left', message.guild.members.get(message.author.id).voiceChannel.name)
    message.channel.send(leaveEmbed);
}

module.exports.help = {
    names: ['leave'],
    usage: 'e-command <args>',
    description: 'what?'
}