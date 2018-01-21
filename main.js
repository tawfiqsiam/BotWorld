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
bot.on('ready', async () =>{
    console.log(`${bot.user.username}: online`);
});

bot.on('message', async message =>{
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
            config.users[i] = {"id": user, "balance": 0, "rank": 0, "username": bot.users.get(user).username, "lastPayday": 'never'};
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


    //Moderator commands
    if(command=='mute'){
        if(message.guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){
            let mUser;
            if(message.guild.members.get(args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
                mUser = message.guild.members.get(args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''));
                if(!message.guild.roles.find('name', 'muted')){
                    message.guild.createRole({
                        name: 'muted',
                        permissions: []
                    });
                }

                if(message.guild.members.get(mUser.id).roles.find('name', 'muted')){
                    message.guild.members.get(mUser.id).removeRole(message.guild.roles.find('name', 'muted'));

                    let unmutedEmbed = new Discord.RichEmbed()
                    .setColor('#FF2D40')
                    .setTitle('Unmuted!')
                    .addField('User', `${mUser.user.username}`)
                    .addField('Server', message.guild.name)
                    .addField('By', message.author)
                    .addField('Reason', args.slice(1).join(' '));
                    mUser.send(unmutedEmbed);
                    return message.channel.send(unmutedEmbed);
                }else{
                    message.guild.members.get(mUser.id).addRole(message.guild.roles.find('name', 'muted'));
                    message.guild.members.get(mUser.id).permissions.remove("SEND_MESSAGES");
                    let mutedEmbed = new Discord.RichEmbed()
                    .setColor('#FF2D40')
                    .setTitle('Muted!')
                    .addField('User', `${mUser.user.username}`)
                    .addField('Server', message.guild.name)
                    .addField('By', message.author)
                    .addField('Reason', args.slice(1).join(' '));
                    mUser.send(mutedEmbed);
                    return message.channel.send(mutedEmbed);
                }
            }else{
                let noSuchUserInGuildEmbed = new Discord.RichEmbed()
                .setColor('#FF2D40')
                .addField('Who?', `Couldn't find the user mentioned`);
                return message.channel.send(noSuchUserInGuildEmbed);
            }
        }else{
            let noPermmisionEmbed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField(`You don't have the required permmision(s):`, 'MANAGE_MESSAGES');
            return message.channel.send(noPermmisionEmbed);
        }
    }

    if(command=='kick'){

        if(!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')){
            let noPermmisionEmbed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .addField(`You don't have the required permmision(s):`, 'MANAGE_MESSAGES');
            return message.channel.send(noPermmisionEmbed);
        }

        let kUser;
        if(message.guild.members.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
            kUser = message.guild.members.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))
        }else{
            let noUserEmbed = new Discord.RichEmbed()
            .setColor('#FF2D40')
            .setTitle('Error')
            .addField('What went wrong?', `The user you mentioned in the first argument didn't exist`);
            return message.channel.send(noUserEmbed);
        }

        
        let kickEmbed = new Discord.RichEmbed()
        .setColor('#FF2D40')
        .setTitle('Kicked')
        .addField('User', `${kUser.user.username}`)
        .addField('Server', message.guild.name)
        .addField('By', message.author)
        .addField('Reason', args.slice(1).join(' '));
        kUser.send(kickEmbed);
        message.channel.send(kickEmbed);
        kUser.kick();
        return;
    }
});

bot.login(config.token);