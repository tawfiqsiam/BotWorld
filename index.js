const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

let bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queue = [];
//Load in the command files
let index;
for(index=0;index<config.commands.length;index++){
    let i2 = index;
    fs.readdir(config.commanddir + config.commands[index], function(err, files){
        if(err) console.log(err);
    
        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if(jsfile.length<=0){
            console.log('error reading files');
        }
    
        jsfile.forEach(function(f, i){
            let props = require(`${config.commanddir}${config.commands[i2]}/${f}`);
            props.help.names.forEach(function(name){
                bot.commands.set(name, props);
            });
        });
    });
}


//When the bot is online
bot.on('ready', function(){
    console.log(`Logged in as ${bot.user.username}`);
    bot.user.setGame('Being rewritten, Bear with me');
});

//When a message is sent
bot.on('message', function(message){
    let prefix = config.prefix;

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    //Split up the command and arguments
    let args = message.content.split(" ");
    let command = args[0];
    command = command.slice(prefix.length).toLowerCase();
    args = args.slice(1); 

    let commandFile = bot.commands.get(command);
    if(commandFile){
        commandFile.run(bot, command, args, message);
    }
});

//Login
bot.login(config.token);