const config = require('./../config.json');
const fs = require('fs');
const economy = require('./../economy.json');
const defaultSetup = {'balance':0, 'lastPayday':'never'};

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

function updateJSON(){
    console.log(economy);
    fs.writeFile('./economy.json', JSON.stringify(economy, null, 2), function (err) {
         if (err) return console.log(err);
     });
}

module.exports.setBalance = function(userID, amount){
    if(!economy.users[userID.toString()]){
        economy.users[userID.toString()] = defaultSetup;
    }
    economy.users[userID.toString()].balance = amount;
    updateJSON();
}

module.exports.getBalance = function(userID){
    if(economy.users[userID.toString()]==undefined){
        economy.users[userID.toString()] = defaultSetup;
        updateJSON();
    }
    return economy.users[userID.toString()].balance;
}

module.exports.payDay = function(userID){
    if(!economy.users[userID.toString()]){
        economy.users[userID.toString()] = defaultSetup;
        updateJSON();
    }

    if(economy.users[userID.toString()].lastPayday=='never'||Math.floor((Date.now() - economy.users[userID.toString()].lastPayday)/1000)>=1800){
        economy.users[userID.toString()].balance += 50;
        updateJSON();
        return true;
    }else{
        return false;
    }
}