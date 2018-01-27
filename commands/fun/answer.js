const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(Math.floor(args[0])>0 && Math.floor(args[0])<5){
        for(var i=0;i<config.trivia.length;i++){
            if(config.trivia[i].id=message.author.id){
                if(Math.floor((Date.now() - config.trivia[i].started)/1000)<=30 && config.trivia[i].started!='complete'){
                    if(config.trivia[i].answerList[Math.floor(args[0]) - 1] == config.trivia[i].answer){
                        let embed = new Discord.RichEmbed()
                        .setColor('#50BB7C')
                        .setTitle('Correct!')
                        .addField(config.trivia[i].question, config.trivia[i].answer);
                        message.channel.send(embed);
                    }else{
                        let embed = new Discord.RichEmbed()
                        .setColor('#50BB7C')
                        .setTitle('Wrong!')
                        .addField('The correct answer to: ' + config.trivia[i].question, 'Is: ' + config.trivia[i].answer);
                        message.channel.send(embed);
                    }
                  config.trivia[i].started = 'complete';
                  updateJSON();
                }
            }
        }
    }
}

module.exports.help = {
    names: ['answer'],
    usage: 'e-command <args>',
    description: 'what?'
}