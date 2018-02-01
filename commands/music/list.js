const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    console.log(bot.queue[message.guild.id][0][0].title)
let out = 'Queue: \n';
for(var i=0;i<bot.queue[message.guild.id].length;i++){
    out += '**' + bot.queue[message.guild.id][i][0].title + '** Requested by: **' + bot.queue[message.guild.id][i].from + '**';
}
message.channel.send(out);
}

module.exports.help = {
    names: ['list'],
    usage: 'b-list',
    description: 'Show the current queue'
}