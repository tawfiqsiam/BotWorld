const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    message.guild.members.get(message.author.id).voiceChannel.join();
    let joinEmbed = new Discord.RichEmbed()
    .setColor('#BBEEEE')
    .addField('Joined', message.guild.members.get(message.author.id).voiceChannel.name)
    message.channel.send(joinEmbed);
}

module.exports.help = {
    names: ['join'],
    usage: 'e-command <args>',
    description: 'what?'
}