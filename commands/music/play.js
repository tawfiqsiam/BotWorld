const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(bot.dispatchers.get(message.guild.members.get(message.author.id).voiceChannel.id)){
        bot.dispatchers.set(message.guild.members.get(message.author.id).voiceChannel.id, function(){
            const stream = yt(args[0], { filter : 'audioonly' });
            let dispatcher = message.guild.members.get(message.author.id).voiceChannel.connection.playStream(stream, { seek: 0, volume: 1 });
            return {dispatcher, stream};
        });
    }
}

module.exports.help = {
    names: ['play'],
    usage: 'e-command <args>',
    description: 'what?'
}