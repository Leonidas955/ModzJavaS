const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Mute a user",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: "false",
    options: [
        {

        type: "user",
        name: "user",
        description: "The user to mute",
        required: true,

    
    }, {

        type: "string",
        name: "duration",
        description: "The duration of mute in minutes",
        required: true,
    }, {

        type: "string",
        name: "reason",
        description: "Include a reason for the mute",
        required: false,
    }
],


    async run(bot, message, args) {

        let user = args.getUser("user")
        if(!user) return message.reply("Invalid user")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("User not found in this guild")

        let time = args.getString("duration")
        if(!time) return message.reply("Invalid duration")   
        if(isNaN(ms(time))) return message.reply("Invalid duration format")
        if(ms(time) > 2419200000) return message.reply("Maximum duration is 28 days !")  
            
        let reason = args.getString("reason")
        if(!reason) reason = "No reason provided"
        
        if(message.user.id === user.id) return message.reply("Don't mute yourself")
        if((await message.guild.fetchOwner()).id === user.id)  return message.reply("You can't mute the server owner")
        if(!member.moderatable) return message.reply("You can't mute this user")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("I can't mute this user because they have a higher or equal role than me")
        if(member.isCommunicationDisabled()) return message.reply("This user is currently muted")

        try { await user.send(`Hi, you have been mute from **${message.guild.name}** server by **${message.user.tag}** during ${time} for the reason : \`${reason}\``)} catch(err) {}   
        
        await message.reply(`${message.user} mute **${user.tag}** during ${time} for the reason : \`${reason}\``)
    
        await member.timeout(ms(time), reason)    

    }
}