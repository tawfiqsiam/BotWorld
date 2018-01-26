const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON){
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
      
    if(message.author.username=='NicksWorld'){
         try {
                const code = args.join(" ");
                let evaled = eval(code);

            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            let cleaned = clean(evaled);
         console.log(cleaned);
         let embed = new Discord.RichEmbed()
         .setColor('#688E1E')
         .setTitle('Evaluation')
         .addField(':inbox_tray: Input', '```js\n' + code + '```')
         .addField(':outbox_tray: Output', '```xl\n' + cleaned + '```')
         .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
         return message.channel.send(embed);
      } catch (err) {
        let embed = new Discord.RichEmbed()
        .setColor('#770306')
        .setTitle('Error')
        .addField(':inbox_tray: Input', '```js\n' + args.join(" ") + '```')
        .addField(':outbox_tray: Output', '```xl\n' + err + '```')
        .setFooter('DiscordEconomy#1500 ' + new Date().toISOString(), bot.user.avatarURL);
        return message.channel.send(embed);
     }
        return;
    }
}

module.exports.help = {
    names: ['evaluate', 'eval']
}