const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const https = require('https');
const shuffle = require('array-shuffle');
module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    let triviaEmbed = new Discord.RichEmbed()
    .setColor('#E5E917');
    https.get('https://opentdb.com/api.php?amount=1&type=multiple', res => {
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () =>{
          body = JSON.parse(body).results[0];
          triviaEmbed.addField('Category', body.category);
          triviaEmbed.addField('Question', body.question);
          var answers = [body.correct_answer, body.incorrect_answers[0], body.incorrect_answers[1], body.incorrect_answers[2]]
          let answerList = shuffle(answers);
          answers = answerList.slice(0);
          for(var i=0;i<answerList.length;i++){
            answerList[i] = (i + 1) + ') ' + answerList[i];
          }
          triviaEmbed.addField('Answers', answerList.join('\n'))
          .addField('Answer by typing the answer number :D in the next 30 seconds', 'ex. 1');
          let awnser = body.correct_answer;
          let success = false;
          for(var i=0;i<config.trivia.length;i++){
            if(config.trivia[i].id=message.author.id){
              config.trivia[i] = {id: message.author.id, answer: awnser, started: Date.now, answerList: answers};
              updateJSON();
              success = true;
            }
        }
        if(!success){
          config.trivia[config.trivia.length] = {id: message.author.id, answer: awnser, started: Date.now, answerList: answers};
          updateJSON();
        }
          message.channel.send(triviaEmbed);
        });
      });
}

module.exports.help = {
    names: ['trivia'],
    usage: 'e-trivia',
    description: 'Get a trivia question'
}