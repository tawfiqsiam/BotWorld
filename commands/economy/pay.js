const Discord = require('discord.js');
const fs = require('fs');
const config = require(`../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
        let usage = 'e-pay <amount> <user mention (optional)>';
        if(args[0] == ""||args[0]==undefined){
            let missingAmountEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot get the amount from the first argument')
            .setDescription(`First argument must be included`)
            .addField('Usage', usage);
            return message.channel.send(missingAmountEmbed);
        }

        if(Math.floor(args[0]) != args[0]){
            let notNumberEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('Not a number')
            .setDescription(`"${args[0]}" is not a number or is a decimal`)
            .addField('Usage', usage);
            return message.channel.send(notNumberEmbed);
        }

        if(args[1] == ""||args[1]==undefined){
            let noUserEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot get the user mention from the second argument')
            .setDescription(`Second argument must be included`)
            .addField('Usage', usage);
            return message.channel.send(noUserEmbed);
        }
        let authorInfo;
        let i;
        for(i = 0;i<config.users.length;i++){
            if(config.users[i].id==message.author.id){
                authorInfo = config.users[i];
            }
        }

        if(args[0]>authorInfo.balance){
            let notEnoughMoneyEmbed = new Discord.RichEmbed()
            .setTitle('Not enough money!')
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `You don't have enough money to give! ${args[0]} > ${authorInfo.balance}`);
            return message.channel.send(notEnoughMoneyEmbed);
        }

        if(args[0]<0){
            return message.channel.send("Hey! What did you think would happen?\nDon't try to take money!");
        }

        if(!bot.users.find("id", args[1].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
            let noUserEmbed = new Discord.RichEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot find the user mention from the second argument')
            .setDescription(`User '${args[1]}' is not found`)
            .addField('Usage', usage);
            return message.channel.send(noUserEmbed);
        }else{
            let success = false;
            let giveToInfo;
            let i;
            for(i = 0;i<config.users.length;i++){
                if(config.users[i].id==bot.users.find("id", args[1].replace('<', '').replace('!', '').replace('@', '').replace('>', '')).id){
                    giveToInfo = config.users[i];
                    config.users[i].balance = Number(giveToInfo.balance) + Number(args[0]);
                    updateJSON();
                    success = true;
                }
            }
            if(success==true){
                for(i = 0;i<config.users.length;i++){
                    if(config.users[i].id==message.author.id){
                        config.users[i].balance -= args[0];
                        updateJSON();
                        message.channel.send(`Given ${giveToInfo.username} $${args[0]}`);
                    }
                }
            }else{
                let cannotReciveEmbed = new Discord.RichEmbed()
                .setColor('#FF4444')
                .setTitle(`Cannot send money to user '${args[1]}'`)
                .setDescription(`Fix by doing e-bal ${args[1]}`)
                return message.channel.send(cannotReciveEmbed);
            }
        }
}

module.exports.help = {
    names: ['pay']
}