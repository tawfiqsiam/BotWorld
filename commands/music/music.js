const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const search = require('youtube-search');
const yt = require('ytdl-core');

var opts = {
  maxResults: 1,
  key: 'youtube v3 API key'
};
let dispatcher;
function play(message, song){
    if(song!=undefined){
        message.channel.send(`Playing song **${song[0].title}**`);
        let stream = yt(song[0].link, { filter : 'audioonly', passes:3 });
        dispatcher = message.guild.voiceConnection.playStream(stream, { seek: 0, volume: 1 });
        dispatcher.once('end', function(){
          setTimeout(function(){
            queue[message.guild.id].shift();
            play(message, queue[message.guild.id][0]);
          }, 500);
        });
    }else{
        message.channel.send('No more songs, why not add more using e-queue <title>, and e-music play to start them :D.');
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
            queue[message.guild.id][0] = results;
            message.channel.send(`Queued song **${results[0].title}**`);
        });
      }else{
      search(args.slice(1).join(' '), opts, function(err, results) {
        if(err) return console.log(err);
        console.log(queue[message.guild.id].length);
          queue[message.guild.id][queue[message.guild.id].length] = results;
          message.channel.send(`Queued song **${results[0].title}**`);
        });
      }
    }else{
       message.channel.send('You must be in a voice channel to do this!');
      }
  }
  
  if(args[0]=='play'){
      play(message, queue[message.guild.id][0]);
  }

  if(args[0]=='skip'){
      dispatcher.end();
  }

  if(args[0]=='list'){
    console.log(queue[message.guild.id][0][0].title)
      let out = 'Queue: \n';
      for(var i=0;i<queue[message.guild.id].length;i++){
          out += queue[message.guild.id][i][0].title + '\n';
      }
    message.channel.send(out);
  }
}

module.exports.help = {
    names: ['music'],
    usage: 'e-command <args>',
    description: 'what?'
}
