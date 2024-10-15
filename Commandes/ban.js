const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban a user",
    permisssion: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "User to ban",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "The reason of ban",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {

        
        let user = await bot.users.fetch(args._hoistedOptions[0].value)
        if(!user) return message.reply("No member to ban")
        let member = message.guild.members.cache.get(user.id)

        let reason = args.getString("raison")
        if(!reason) reason = "No reason provided";

        if(message.user.id === user.id) return message.reply("You can't ban yourself")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't ban the owner")
        if(member && !member.bannable) return message.reply("I can't ban this user")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("I can't ban this user because they have a higher or equal role than me")
        if((await message.guild.bans.fetch()).get(user.id)) return message.reply("This user is already banned")
            
        try { await user.send(`Hi, you have been ban from **${message.guild.name}** server by **${message.user.tag}** for the reason : \`${reason}\``)} catch(err) {}   
        
        await message.reply(`${message.user} banned **${user.tag}** for the reason : \`${reason}\``)

        await message.guild.bans.create(user.id, {reason: reason})

        } catch(err) {

            return message.reply("No member to ban")
        } 
    }
}