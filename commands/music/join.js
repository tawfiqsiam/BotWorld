const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(message.guild.members.get(message.author.id).voiceChannel){
        message.guild.members.get(message.author.id).voiceChannel.join();
        let joinEmbed = new Discord.RichEmbed()
        .setColor('#BBEEEE')
        .addField('Joined', message.guild.members.get(message.author.id).voiceChannel.name)
        message.channel.send(joinEmbed);
    }else{
        let notInVoiceChannelEmbed = new Discord.RichEmbed()
        .setColor('#d82c2c')
        .addField('Error', 'You are not in a voice channel!')
        message.channel.send(notInVoiceChannelEmbed);
    }
}

module.exports.help = {
    names: ['join'],
    usage: 'e-join',
    description: 'Make the bot join the voice channel you are in'
}