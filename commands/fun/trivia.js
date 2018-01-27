const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const http = require('http');
module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    let triviaEmbed = new Discord.RichEmbed()
    .setColor('#E5E917');
    http.get('http://jservice.io/api/random', res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body)[0];
          triviaEmbed.addField('Category', body.category.title);
          triviaEmbed.addField('Question', body.question);
          message.channel.send(triviaEmbed);
        });
      });
}

module.exports.help = {
    names: ['trivia'],
    usage: 'e-trivia',
    description: 'Get a trivia question'
}