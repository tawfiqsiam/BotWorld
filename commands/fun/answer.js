const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(Math.floor(message.content)>0 && Math.floor(message.content)<5){
        for(var i=0;i<config.trivia.length;i++){
            if(config.trivia[i].id=message.author.id){
                if(Math.floor((Date.now() - config.trivia[i])/1000)<=30){
                    if(config.trivia[i].answerList[Math.floor(message.content)]==config.trivia[i].answer){
                        message.channel.send('correct');
                    }else{
                        message.channel.send('wrong')
                    }
                }
            }
        }
      }
}

module.exports.help = {
    names: ['command'],
    usage: 'e-command <args>',
    description: 'what?'
}