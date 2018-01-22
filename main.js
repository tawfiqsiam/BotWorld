const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Setup for editing the filesystem for config
var fs = require('fs');
//Colorful console
const color = require('color');
//Discord
const Discord = require('discord.js');
//Config
const config = require(`./config.json`);

//Create client
let bot = new Discord.Client({'disableEveryone': true});

function updateJSON(){
    if(JSON.stringify(config, null, 2).endsWith("}}")){
        fs.writeFile('./config.json', JSON.stringify(config, null, 2).substring(0, JSON.stringify(config, null, 2).length - 1), function (err) {
            if (err) return console.log(err);
        });
    }else{
        fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
            if (err) return console.log(err);
        });
    }
}

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

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};

//On bot.ready
bot.on('ready', function(){
    console.log(`${bot.user.username}: online`);
});

bot.on('message', function(message){
  console.log(bot.guilds.size);
  bot.guilds.forEach(function(guild){
    console.log(guild.name);
  });
  
    if(message.author.bot) return;
    //setup command variables
    let prefix = config.prefix;
    if(message.content.substring(0, prefix.length)!=prefix){
        let configIndex;
        let authorInfo;
        let i;
        for(i = 0;i<config.users.length;i++){
            if(config.users[i].id==message.author.id){
                authorInfo = config.users[i];
                configIndex = i;
            }
        }
        if(authorInfo==undefined){
            config.users[i] = {"id": message.author.id, "balance": 0, "rank": 0, "username": message.author.username, "lastPayday": 'never'};
            configIndex = i;
            updateJSON();
        }
        config.users[configIndex].rank = config.users[configIndex].rank + message.content.split(" ").length;
        updateJSON();
        return;
    }
    let args = message.content.split(" ");
    let command = args[0];
    command = command.slice(prefix.length).toLowerCase();
    args = args.slice(1); 

    if(command=='bal'||command=='balance'){
        let user = message.author.id;
        if(args[0]!=null){
            if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
            }else{
                return message.channel.send(`Couldn't find user "${args[0]}" :cry:`);
            }
        }
        let authorInfo;
        for(var i = 0;i<config.users.length;i++){
            if(config.users[i].id==user){
                authorInfo = config.users[i];
            }
        }
        if(authorInfo==undefined){
            config.users[i] = {"id": user, "balance": 0, "rank": 0, "username": bot.users.get(user).username, "lastPayday": 'never'};
            updateJSON();
            authorInfo = config.users[i];
        }

        let balanceEmbed = new Discord.RichEmbed()
        .setDescription(`${bot.users.get(user).username}'s Balance`)
        .setColor('#50BB7C')
        .addField('Balance', authorInfo.balance);
        return message.channel.send(balanceEmbed);
    }

    if(command=='rank'){
        let user = message.author.id;
        if(args[0]!=null){
            if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
            }else{
                return message.channel.send(`Couldn't find user "${args[0]}" :cry:`);
            }
        }
        let authorInfo;
        for(var i = 0;i<config.users.length;i++){
            if(config.users[i].id==user){
                authorInfo = config.users[i];
            }
        }
        if(authorInfo==undefined){
            config.users[i] = {"id": user, "balance": 0, "rank": 0, "username": bot.users.get(user).username, "lastPayday": 'never'};
            updateJSON();
            authorInfo = config.users[i];
        }

        let rankEmbed = new Discord.RichEmbed()
        .setDescription(`${bot.users.get(user).username}'s Rank`)
        .setColor('#50BB7C')
        .addField('Rank', authorInfo.rank);
        return message.channel.send(rankEmbed);
    }

    if(command=='pd'||command=='payday'){
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
                    .setDescription(`${message.author.username}'s Balance`)
                    .setColor('#50BB7C')
                    .addField('Balance', authorInfo.balance);
                    return message.channel.send(balanceEmbed);
                }
            }
        }else{
            let timeremainingembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField(`Please wait`, `${convertMS(1800000 - (Date.now() - authorInfo.lastPayday)).m} Minutes and ${convertMS(1800000 - (Date.now() - authorInfo.lastPayday)).s} Seconds`);
            return message.channel.send(timeremainingembed);
        }
    }

    if(command=='pay'){
        if(args[0] == ""||args[0]==undefined){
            let missingargsembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `args[0] (amount) is missing`);
            return message.channel.send(missingargsembed);
        }
        if(args[1] == ""||args[1]==undefined){
            let missingargsembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `args[1] (user) is missing`);
            return message.channel.send(missingargsembed);
        }
        let authorInfo;
        let i;
        for(i = 0;i<config.users.length;i++){
            if(config.users[i].id==message.author.id){
                authorInfo = config.users[i];
            }
        }

        if(args[0]>authorInfo.balance){
            let notenoughmoneyembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `You don't have enough money to give!`);
            return message.channel.send(notenoughmoneyembed);
        }

        if(authorInfo==undefined || authorInfo.balance <= 0){
            let nomoneyembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `You don't have any money to give!`);
            return message.channel.send(nomoneyembed);
        }

        if(Math.floor(args[0]) != args[0]){
            let notnumberembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `args[0] is not a number D:`);
            return message.channel.send(notnumberembed);
        }

        if(args[0]<0){
            return message.channel.send("Hey! What did you think would happen?");
        }
        if(!bot.users.find("id", args[1].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
            let nouserembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `Couldn't find user mentioned in args[1]`);
            return message.channel.send(nouserembed);
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
                let nomoneyembed = new Discord.RichEmbed()
                .setColor('#FF2D40')
                .addField('Cannot fullfil your request :cry:', `The user couldn't recive the money D:`);
                return message.channel.send(nomoneyembed);
            }
        }
    }

    if(command=='cf'||command=='coinflip'){
        if(Math.floor(args[0]) != args[0]){
            let notintegerembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', 'args[0] is Not an integer');
            return message.channel.send(notintegerembed);
        }

        if(Number(args[0]) <= 0){
            let whyembed = new Discord.RichEmbed()
            .setTitle('Why?')
            .setColor('#FF2D40')
            .addField('What you wanted to do:', 'Make no money...');
            return message.channel.send(whyembed);
        }
        let authorInfo;
        let index;
        let i;
        for(index = 0;index<config.users.length;index++){
            if(config.users[index].id==message.author.id){
                authorInfo = config.users[index];
                i = index;
            }
        }

        if(args[0]>authorInfo.balance){
            let notenoughmoneyembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Cannot fullfil your request :cry:', `You don't have enough money!`);
            return message.channel.send(notenoughmoneyembed);
        }

        if(authorInfo==undefined){
            config.users[i] = {"id": authorInfo.id, "balance": 0, "rank": 0, "username": bot.users.get(authorInfo.id).username, "lastPayday": 'never'};
            updateJSON();
            authorInfo = config.users[index];
        }

        if(Math.floor(Math.random() * 2) + 1 == 1){
            let winembed = new Discord.RichEmbed()
            .setColor('#50BB7C')
            .addField('Results:', `You have won $${Number(args[0])/2} :D`);
            config.users[i].balance = config.users[i].balance + Number(args[0]/2);
            return message.channel.send(winembed);
        }else{
            let loseembed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField('Results:', `You have lost $${Number(args[0])} D:`);
            config.users[i].balance = config.users[i].balance - Number(args[0]);
            updateJSON();
            return message.channel.send(loseembed);
        }
    }

    if(command=='give'){
        let user;
        if(message.author.username=='NicksWorld'){
            if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
                for(var i = 0;i<config.users.length;i++){
                    if(config.users[i].id==user){
                        config.users[i].balance = config.users[i].balance + Number(args[1]);
                        let successEmbed = new Discord.RichEmbed()
                        .setColor('#50BB7C')
                        .addField('Gave', `${config.users[i].username}`)
                        .addField('Amount', `${args[1]}`);
                        return message.channel.send(successEmbed);
                    }
                }
            }
        }
    }

    if(command=='set'){
        let user;
        if(message.author.username=='NicksWorld'){
            if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
                for(var i = 0;i<config.users.length;i++){
                    if(config.users[i].id==user){
                        config.users[i].balance = Number(args[1]);
                        let successEmbed = new Discord.RichEmbed()
                        .setColor('#50BB7C')
                        .addField('Gave', `${config.users[i].username}`)
                        .addField('Amount', `${args[1]}`);
                        return message.channel.send(successEmbed);
                    }
                }
            }
        }
    }

    if(command=='source'){
        let embed = new Discord.RichEmbed()
        .addField('Github', 'https://github.com/NicksWorld/DiscordEconomy');
        return message.channel.send(embed);
    }

    if(command=='botprofile'){
        let embed = new Discord.RichEmbed()
        .addField('Profile', 'https://discordbots.org/bot/404762043527462922');
        return message.channel.send(embed);
    }

    if(command=='ft'||command=='fortuneteller'){
        let results = ['You will be rich :money_mouth:', 'You will be fearful of heights.', 'You will want another fortune told.', 'You want a cookie'];
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Fortune`)
        .setDescription(results[Math.floor(Math.random() * results.length)]);
        return message.channel.send(embed);
    }
});

bot.login(config.token);
