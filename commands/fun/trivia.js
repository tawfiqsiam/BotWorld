const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const https = require('https');
const shuffle = require('array-shuffle');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

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
          triviaEmbed.addField('Category', body.category.replaceAll('&quot;', '"').replaceAll('&#039;s', "'"));
          triviaEmbed.addField('Question', body.question.replaceAll('&quot;', '"').replaceAll('&#039;s', "'"));
          var answers = [body.correct_answer.replaceAll('&quot;', '"').replaceAll('&#039;s', "'"), body.incorrect_answers[0].replaceAll('&quot;', '"').replaceAll('&#039;s', "'"), body.incorrect_answers[1].replaceAll('&quot;', '"').replaceAll('&#039;s', "'"), body.incorrect_answers[2].replaceAll('&quot;', '"').replaceAll('&#039;s', "'")];
          let answerList = shuffle(answers);
          answers = answerList.slice(0);
          for(var i=0;i<answerList.length;i++){
            answerList[i] = (i + 1) + ') ' + answerList[i];
          }
          triviaEmbed.addField('Answers', answerList.join('\n'))
          .addField('Answer by typing the command b-answer <answer number> :D in the next 30 seconds', 'ex. b-answer 2');
          let awnser = body.correct_answer.replaceAll('&quot;', '"').replaceAll('&#039;s', "'");
          let success = false;
          for(var i=0;i<config.trivia.length;i++){
            if(config.trivia[i].id=message.author.id){
              config.trivia[i] = {id: message.author.id, answer: awnser, started: Date.now, answerList: answers, started: Date.now(), question: body.question.replaceAll('&quot;', '"').replaceAll('&#039;s', "'")};
              updateJSON();
              success = true;
            }
        }
        if(!success){
          config.trivia[config.trivia.length] = {id: message.author.id, answer: awnser, answerList: answers, started: Date.now(), question: body.question.replaceAll('&quot;', '"').replaceAll('&#039;s', "'")};
          updateJSON();
        }
          message.channel.send(triviaEmbed);
        });
      });
}

module.exports.help = {
    names: ['trivia'],
    usage: 'b-trivia',
    description: 'Get a trivia question'
}