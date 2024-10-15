const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "unmute",
    description: "Unmute a user",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: "false",
    options: [
        {

        type: "user",
        name: "user",
        description: "The user to unmute",
        required: true,

    
    },  {

        type: "string",
        name: "reason",
        description: "Include a reason for the unmute",
        required: false,
    }
],


    async run(bot, message, args) {

        let user = args.getUser("user");
        if(!user) return message.reply("Invalid user")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("User not found in this guild")
        
        let reason  = args.getString("reason")
        if(!reason) reason = "No reason provided"
        
        if(!member.moderatable) return message.reply("I can't unmute this user")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("I can't unmute this user because they have a higher or equal role than me")
        if(!member.isCommunicationDisabled()) return message.reply("This user is not currently muted")    

        try {await user.send(`Hi, you have been unmute by **${message.user.tag}** for the reason : \`${reason}\``)} catch(err) {}
        
        await message.reply(`${message.user} unmute **${user.tag}** for the reason : \`${reason}\``)
        
        await member.timeout(null, reason)
    }
}