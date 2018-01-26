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
  console.log(bot.guilds.size);
}, 280000);

//Setup for editing the filesystem for config
var fs = require('fs');
//Colorful console
const color = require('color');
//Discord
const Discord = require('discord.js');
//Config
const config = require(`./config.json`);

const dbl = require(`discord-bot-list`);

let bot = new Discord.Client({'disableEveryone': true});
bot.commands = new Discord.Collection();

//Read economy commands
fs.readdir('./commands/economy/', function(err, files){
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() == 'js');
    if(jsfile.length<=0){
        console.log('error reading files');
    }

    jsfile.forEach(function(f, i){
        let props = require(`./commands/economy/${f}`);
        props.help.names.forEach(function(name){
            bot.commands.set(name, props);
        });
    });
});

const client = new dbl({
    token: config.dbl,
    id: "404762043527462922"
});

function updateDiscordBotList(){
    client.postStats(bot.guilds.size, (err, res) => {
        if(err) {
            console.error(err);
        } else {
            console.log(res);
        }
    })
}

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
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
    bot.user.setActivity('e-help');
    updateDiscordBotList();
});

bot.on('guildCreate', updateDiscordBotList);
bot.on('guildDelete', updateDiscordBotList);

bot.on('message', function(message){
    //setup command variables
    let prefix = config.prefix;
    // if(message.content.substring(0, prefix.length)!=prefix){
    //     let configIndex;
    //     let authorInfo;
    //     let i;
    //     for(i = 0;i<config.users.length;i++){
    //         if(config.users[i].id==message.author.id){
    //             authorInfo = config.users[i];
    //             configIndex = i;
    //         }
    //     }
    //     if(authorInfo==undefined){
    //         config.users[i] = {"id": message.author.id, "balance": 0, "rank": 0, "username": message.author.username, "lastPayday": 'never'};
    //         configIndex = i;
    //         updateJSON();
    //     }
    //     config.users[configIndex].rank = config.users[configIndex].rank + message.content.split(" ").length;
    //     updateJSON();
    //     return;
    // }
    let args = message.content.split(" ");
    let command = args[0];
    command = command.slice(prefix.length).toLowerCase();
    args = args.slice(1); 

    let commandFile = bot.commands.get(command);
    if(commandFile){
        commandFile.run(bot,command,args,message, 
    function updateJSON(){
        if(JSON.stringify(config, null, 2).endsWith("}}")){
            fs.writeFile('../../../config', JSON.stringify(config, null, 2).substring(0, JSON.stringify(config, null, 2).length - 1), function (err) {
                if (err) return console.log(err);
            });
        }else{
            fs.writeFile('./config.json', JSON.stringify(config, null, 2), function (err) {
                if (err) return console.log(err);
            });
        }
    });
    }

    // if(command=='rank'){
    //     let usage = 'e-rank <user mention (optional)>';
    //     let user = message.author.id;
    //     if(args[0]!=null){
    //         if(bot.users.find("id", args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', ''))){
    //             user = args[0].replace('<', '').replace('!', '').replace('@', '').replace('>', '');
    //         }else{
    //             let noSuchUserEmbed = new Discord.RichEmbed()
    //             .setColor('#FF4444')
    //             .setTitle('Cannot find user')
    //             .setDescription(`User '${args[0]}' couldn't be found!`)
    //             .addField('Usage', usage);
    //             return message.channel.send(noSuchUserEmbed);
    //         }
    //     }
    //     let authorInfo;
    //     for(var i = 0;i<config.users.length;i++){
    //         if(config.users[i].id==user){
    //             authorInfo = config.users[i];
    //         }
    //     }
    //     if(authorInfo==undefined){
    //         config.users[i] = {"id": user, "balance": 0, "rank": 0, "username": bot.users.get(user).username, "lastPayday": 'never'};
    //         updateJSON();
    //         authorInfo = config.users[i];
    //     }

    //     let rankEmbed = new Discord.RichEmbed()
    //     .setDescription(`${bot.users.get(user).username}'s Rank`)
    //     .setColor('#50BB7C')
    //     .addField('Rank', authorInfo.rank);
    //     return message.channel.send(rankEmbed);
    // }

    // if(command=='source'){
    //     let embed = new Discord.RichEmbed()
    //     .setColor('#50BB7C')
    //     .addField('Github', 'https://github.com/NicksWorld/DiscordEconomy');
    //     return message.channel.send(embed);
    // }

    // if(command=='botprofile'){
    //     let embed = new Discord.RichEmbed()
    //     .setColor('#50BB7C')
    //     .addField('Profile', 'https://discordbots.org/bot/404762043527462922');
    //     return message.channel.send(embed);
    // }

    // if(command=='ft'||command=='fortuneteller'){
    //     let results = ['Love will lead the way.',
    //     'If your desires are not extravagant, they will be rewarded.',
    //     'A new outlook brightens your image and brings new friends.',
    //     'You are not judged by your efforts you put in; you are judged on your performance.',
    //     'Sometimes you just need to lay on the floor.',
    //     'Integrity is the essence of everything successful.',
    //     'You have an unusually magnetic personality.',
    //     'Let your fantasies unwind...',
    //     'Accept what comes to you each day.',
    //     'Joys are often the shadows, cast by sorrows.',
    //     'You will always be successful in your professional career',
    //     'Don\'t bother looking for fault. The reward for finding it is low.',
    //     'Keep your eye out for someone special.',
    //     'Follow your bliss and the Universe will open doors where there were once only walls.'];
    //     let embed = new Discord.RichEmbed()
    //     .setTitle(`${message.author.username}'s Fortune`)
    //     .setColor('#50BB7C')
    //     .addField('Fortune', results[Math.floor(Math.random() * results.length)]);
    //     return message.channel.send(embed);
    // }

    // if(command=='servers'){
    //     return message.channel.send(`I am in ${bot.guilds.size} servers :D`);
    // }

    // if(command=='invite'){
    //     let invite = new Discord.RichEmbed()
    //     .addField('Link', 'https://discordapp.com/oauth2/authorize?client_id=404762043527462922&scope=bot&permissions=8')
    //     .setColor('#50BB7C');
    //     return message.channel.send(invite);
    // }

    // if(command=='support'){
    //     let invite = new Discord.RichEmbed()
    //     .addField('Support server link', 'https://discordapp.com/invite/VVmeG9U')
    //     .setColor('#50BB7C');
    //     return message.channel.send(invite);
    // }

    // if(command=='ping'){
    //     let ping = new Discord.RichEmbed()
    //     .setColor('#50BB7C')
    //     .setTitle(':ping_pong: Pong!')
    //     .addField('Time', (new Date().getTime() - message.createdTimestamp) + ' ms')
    //     return message.channel.send(ping);
    // }

    // if(command=='servernames'){
    //     let output = '';
    //     bot.guilds.forEach(function(guild){
    //         output += guild.name + ` - ${guild.memberCount} - ${guild.id}\n`;
    //     })
    //     return message.channel.send(output);
    // }

    // if(command=='uptime'){
    //     let uptime = new Discord.RichEmbed()
    //     .setColor('#50BB7C')
    //     .setTitle('Uptime')
    //     .addField('From: uptimerobot.com', 'https://stats.uptimerobot.com/mYNq3I2JB');
    //     message.channel.send(uptime);
    // }

    // if(command=='eval'){
    //     if(message.author.username=='NicksWorld'){
    //     try {
    //         const code = args.join(" ");
    //         let evaled = eval(code);

    //     if (typeof evaled !== "string")
    //     evaled = require("util").inspect(evaled);
    //     let cleaned = clean(evaled);
    //     console.log(cleaned);
    //     if(cleaned.toString().search('Promise') && cleaned.toString().search('undefined')){
    //         return message.channel.send(cleaned), {code:"xl"};
    //     }
    // } catch (err) {
    //   return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    // }
    // return;
    //     }
    // }

    // if(command=='8ball'){
    //     let ball = new Discord.RichEmbed()
    //     .setColor('#50BB7C')
    //     .setTitle(args.join(' '))
    //     .setImage(`https://raw.githubusercontent.com/NicksWorld/DiscordEconomy/master/8ball%20images/${Math.floor(Math.random() * 8) + 1}.png`)
    //     message.channel.send(ball);
    // }

    // if(command=='embed'){
    //     let usage = 'e-embed <url (ends with .png, .gif, .jpeg, or .jpg)>';
    //     if(args[0]==undefined || args[0]==''){
    //         return message.channel.send('please include the url...');
    //     }
    //     if(args[0].startsWith('./')||args[0].startsWith('../')){
    //         return message.channel.send('No way!');
    //     }
    //     if(!args[0].endsWith('.png') && !args[0].endsWith('.jpg') && !args[0].endsWith('.jpeg') && !args[0].endsWith('.gif')){
    //         return message.channel.send('Url must end with .png, .gif, .jpg, or .jpeg');
    //     }
    //     message.channel.sendFile(args[0]);
    //     return message.delete();
    // }

    // if(command=='draw'){
    //     let ticketChose = Math.floor(Math.random() * config.tickets.total) + 1;
    //     let ticketOn = 0;
    //     if(config.tickets.total == 0){
    //         let noTicketsEmbed = new Discord.RichEmbed()
    //         .setColor('#FF2D40')
    //         .setTitle('No tickets have been purchased, this time...')
    //         .addField('How to buy?', 'Use e-lottery buy to purchase a ticket');
    //         return message.channel.send(noTicketsEmbed);
    //     }
    //     for(var i=0;i<config.users.length;i++){
    //         if(config.users[i].tickets>=1){
    //             for(var i2=0;i2<config.users[i].tickets;i2++){
    //                 ticketOn++;
    //                 if(ticketOn==ticketChose){
    //                     config.users[i].balance += config.tickets.total * 25;
    //                     message.channel.send(`${config.users[i].username} won $${config.tickets.total * 25} in the lottery`);
    //                     config.tickets.total = 0;
    //                     for(var index = 0;index<config.users.length;index++){
    //                         config.users[index].tickets = 0;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // if(command=='rolecount'){
    //     let roleEmbed = new Discord.RichEmbed()
    //     .setColor('#50BB7C');

    //     message.guild.roles.forEach(function(role){
    //         roleEmbed.addField(role.name, role.members.size);
    //     });
    //   message.channel.send(roleEmbed);
    // }

    // if(command=='discriminator'){
    //     let usage = 'e-discriminator <discriminator>';
    //     if(args[0]==''||args[0]==undefined){
    //         let noNumberEmbed = new Discord.RichEmbed()
    //         .setColor('#FF4444')
    //         .setTitle('The first argument does not exist')
    //         .setDescription(`Please include the discriminator`)
    //         .addField('Usage', usage);
    //         return message.channel.send(noNumberEmbed);
    //     }

    //     if(Math.floor(args[0]) != args[0]){
    //         let noNumberEmbed = new Discord.RichEmbed()
    //         .setColor('#FF4444')
    //         .setTitle('The first argument is not a number')
    //         .addField('Usage', usage);
    //         return message.channel.send(noNumberEmbed);
    //     }

    //     let out = '```js\n'
    //     let found = false;
    //     bot.users.forEach(function(user){
    //         if(user.discriminator==args[0]){
    //             out+=user.username + '#' + user.discriminator + '\n';
    //             found = true;
    //         }
    //     });
    //     if(found){
    //         return message.channel.send(out + '```');
    //     }else{
    //         let noUsersEmbed = new Discord.RichEmbed()
    //         .setColor('#FF4444')
    //         .setTitle('The discriminator has no users')
    //         return message.channel.send(noUsersEmbed);
    //     }
    // }

    // if(command=='help'){
    //     let help = new Discord.RichEmbed()
    //     .setColor('#27AE60')
    //     .addField('e-help', 'gives commands (this)')
    //     .addField('e-bal <user mention (optional)>', 'gives a users balance')
    //     .addField('e-pay <amount> <user mention (optional)>', 'sends a user $$')
    //     .addField('e-pd', 'increase your balance by $50')
    //     .addField('e-cf <amount>', 'You win you get half your amount added to your balance, lose you lose the amount')
    //     .addField('e-lottery buy', 'purchases a lottery ticket for $25')
    //     .addField('e-draw', 'draws the winning lottery ticket')
    //     .addField('e-rank <user mention (optional)>', 'gives a users rank')
    //     .addField('e-ft', 'get your fortune told...')
    //     .addField('e-8ball', 'ask me anything...')
    //     .addField('e-ping', 'pong!')
    //     .addField('e-botprofile', 'gives my profile')
    //     .addField('e-discriminator', 'find users with a certain discriminator ex. user#discriminator')
    //     .addField('e-uptime', 'get my uptime from uptimerobot')
    //     .addField('e-servers', 'see how many servers have me!')
    //     .addField('e-servernames', 'see what servers have me!')
    //     .addField('e-source', 'get my source code')
    //     .addField('e-invite', 'invite me to your server')
    //     .addField('e-support', 'get the invite to my support server');
    //     return message.channel.send(help);
    // }
});

bot.login(config.token);
