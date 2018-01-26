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
            if(cleaned.toString().search('Promise') && cleaned.toString().search('undefined')){
                return message.channel.send(cleaned), {code:"xl"};
            }
      } catch (err) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
     }
        return;
    }
}

module.exports.help = {
    names: ['evaluate', 'eval']
}