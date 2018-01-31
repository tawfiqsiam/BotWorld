const Discord = require('discord.js');
const fs = require('fs');
const config = require(`../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    
    function convertMS(ms) {
        var m, s;
    
        s = ms/1000;
        m = Math.round(s/60);
        if(m>s/60){
            m--;
        }
        s = Math.round(s - (m*60));
        return {m: m, s: s};
    };
        let usage = 'b-pd';
        let authorInfo;
        let i;
        for(i = 0;i<config.users.length;i++){
            if(config.users[i].id==message.author.id){
                authorInfo = config.users[i];
            }
        }

        if(authorInfo==undefined){
            config.users[i] = {"id": message.author.id, "balance": 0, "rank": 0, "username": message.author.username, "lastPayday": 'never'};
            updateJSON();
            authorInfo = config.users[i];
        }

        if(authorInfo.lastPayday=='never'||Math.floor((Date.now() - authorInfo.lastPayday)/1000)>=1800){
            for(i = 0;i<config.users.length;i++){
                if(config.users[i].id==message.author.id){
                    config.users[i].balance += 50;
                    config.users[i].lastPayday = Date.now();
                    updateJSON();
                    let balanceEmbed = new Discord.RichEmbed()
                    .setDescription(`${message.author.username}'s New Balance`)
                    .setColor('#50BB7C')
                    .addField('Balance', authorInfo.balance)
                    addFooter(balanceEmbed, bot, message, command, args);
                    return message.channel.send(balanceEmbed);
                }
            }
        }else{
            let timeremainingembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .setTitle('30 minute cooldown not complete')
            .addField(`Please wait`, `${convertMS(1800000 - (Date.now() - authorInfo.lastPayday)).m} Minutes and ${convertMS(1800000 - (Date.now() - authorInfo.lastPayday)).s} Seconds`)
            addFooter(timeremainingembed, bot, message, command, args);
            return message.channel.send(timeremainingembed);
        }
}

module.exports.help = {
    names: ['payday', 'pd'],
    usage: 'b-pd',
    description: 'Get $50 every 30 minutes'
}