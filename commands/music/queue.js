const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const search = require('youtube-search')

var opts = {
  maxResults: 1,
  key: config.yt
};

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(message.guild.voiceChannel == undefined){
        if(message.guild.members.get(message.author.id).voiceChannel != undefined){
          message.guild.members.get(message.author.id).voiceChannel.join();
        }else{
            return message.channel.send('You must be in a voice channel to do this!');
        }
    }

    if(message.guild.members.get(message.author.id).voiceChannel != undefined){
        if(bot.queue[message.guild.id]==undefined){
            bot.queue[message.guild.id] = [];
      search(args.slice(1).join(' '), opts, function(err, results) {
      if(err) return console.log(err);
        if(results[0].title==undefined){
            message.channel.send('There were no results for **' + args.slice(1).join(' ') + '**');
        }else{
            bot.queue[message.guild.id][0] = results;
            message.channel.send(`Queued song **${results[0].title}**`);
            bot.queue[message.guild.id][0].from = message.author.username + message.author.discriminator;
        }
         });
     }else{
      search(args.slice(1).join(' '), opts, function(err, results) {
       if(err) return console.log(err);
       if(results[0].title == undefined){
         message.channel.send('There were no results for **' + args.slice(1).join(' ') + '**');
       }else{
        console.log(bot.queue[message.guild.id].length);
        bot.queue[message.guild.id][bot.queue[message.guild.id].length] = results;
        message.channel.send(`Queued song **${results[0].title}**`);
        bot.queue[message.guild.id][bot.queue[message.guild.id].length].from = message.author.username + message.author.discriminator;
      }
      });
       }
    }else{
       message.channel.send('You must be in a voice channel to do this!');
       }
}

module.exports.help = {
    names: ['queue'],
    usage: 'b-queue <song name>',
    description: 'Gueue a song to be played :D'
}
