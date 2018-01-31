const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const search = require('youtubb-search');
const yt = require('ytdl-core');

var opts = {
  maxResults: 1,
  key: 'AIzaSyCFgP40sEixaGAtalv2eh97dNJ695hVdCo'
};
let dispatcher;
function play(message, song){
    if(song!=undefined){
        message.channel.send(`Playing song **${song[0].title}** ` + '** Requested by: **' + song.from + '**');
        let stream = yt(song[0].link, { filter : 'audioonly', passes:3 });
        dispatcher = message.guild.voiceConnection.playStream(stream, { seek: 0, volume: 1 });
        dispatcher.once('end', function(){
          setTimeout(function(){
            queue[message.guild.id].shift();
            play(message, queue[message.guild.id][0]);
          }, 500);
        });
    }else{
        message.channel.send('No more songs, why not add more using b-queue <title>, and b-music play to start them :D.');
        message.guild.members.get(message.author.id).voiceChannel.leave();
    }
}
let queue = [];
module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
  if(args[0]=='queue'){
      if(message.guild.voiceChannel == undefined){
          if(message.guild.members.get(message.author.id).voiceChannel != undefined){
            message.guild.members.get(message.author.id).voiceChannel.join();
          }else{
              return message.channel.send('You must be in a voice channel to do this!');
          }
      }

      if(message.guild.members.get(message.author.id).voiceChannel != undefined){
        if(queue[message.guild.id]==undefined){
        queue[message.guild.id] = [];
        search(args.slice(1).join(' '), opts, function(err, results) {
        if(err) return console.log(err);
          if(results[0].title==undefined){
            message.channel.send('There were no results for **' + args.slice(1).join(' ') + '**');
          }else{
            queue[message.guild.id][0] = results;
            message.channel.send(`Queued song **${results[0].title}**`);
            queue[message.guild.id][0].from = message.author.username + message.author.discriminator;
          }
        });
      }else{
      search(args.slice(1).join(' '), opts, function(err, results) {
        if(err) return console.log(err);
        if(results[0].title == undefined){
          message.channel.send('There were no results for **' + args.slice(1).join(' ') + '**');
        }else{
          console.log(queue[message.guild.id].length);
          queue[message.guild.id][queue[message.guild.id].length] = results;
          message.channel.send(`Queued song **${results[0].title}**`);
          queue[message.guild.id][queue[message.guild.id].length].from = message.author.username + message.author.discriminator;
        }
        });
      }
    }else{
       message.channel.send('You must be in a voice channel to do this!');
      }
  }
  
  if(args[0]=='play'){
    if(queue[message.guild.id].length<=0){
      message.channel.send('There are no songs queued! Queue some using b-music queue <song name>');
    }else{
      play(message, queue[message.guild.id][0]);
    }
  }

  if(args[0]=='skip'){
      dispatcher.end();
  }

  if(args[0]=='list'){
    console.log(queue[message.guild.id][0][0].title)
      let out = 'Queue: \n';
      for(var i=0;i<queue[message.guild.id].length;i++){
          out += '**' + queue[message.guild.id][i][0].title + '** Requested by: **' + queue[message.guild.id][i].from + '**';
      }
    message.channel.send(out);
  }
  
  if(args[0]=='playing'){
    message.channel.send('**' + queue[message.guild.id][0][0].title + '** Requested by: **' + queue[message.guild.id][0].from + '**');
  }
}

module.exports.help = {
    names: ['music'],
    usage: 'b-music <queue <song>/play/skip/list>',
    description: 'Play some good music! :D'
}