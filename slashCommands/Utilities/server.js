const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'server',
	description: "Used to view info about the current server",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        try {
            if (interaction.guild.memberCount !== interaction.guild.members.cache.size) await interaction.guild.members.fetch()
            const members = interaction.guild.members.cache;
            const channels = interaction.guild.channels.cache;
            const emojis = interaction.guild.emojis.cache.size;
            const stickers = interaction.guild.stickers.cache.size;
            const bots = interaction.guild.members.cache.filter(member => member.user.bot).size;
            const human = interaction.guild.members.cache.filter(member => !member.user.bot).size;
            let onlineMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "online").size
            let dndMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "dnd").size
            let idelMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "idle").size
            let EmbedError = new EmbedBuilder()
                .setTitle('Server Info')
                .setAuthor({ name: `${interaction.guild.name}'s Info`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
                .addFields({ name: ' 👥 Members', value: `${interaction.guild.memberCount} `, inline: true })
                .addFields({ name: ' 🆔 Server ID', value: `${interaction.guildId}`, inline: true })
                .addFields({ name: ' 📆 Created On', value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, inline: true })
                .addFields({ name: ' 👑 Owner ', value: `<@!${interaction.guild.ownerId}>`, inline: true })
                .addFields({ name: ' 🧧 Roles', value: `${interaction.guild.roles.cache.size}`, inline: true })
                .addFields({ name: ' 💬 Channels ', value: `${interaction.guild.channels.cache.size} `, inline: true })
                .addFields({ name: ' ⭐ Emojis ', value: `${interaction.guild.emojis.cache.size}`, inline: true })
                .addFields({ name: ' 🃏 Stickers', value: `${interaction.guild.stickers.cache.size}`, inline: true })
                .addFields({ name: ' 🤖 Bots', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}`, inline: true })
                .addFields({ name: ' 🥼 Human', value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true })
                .addFields({ name: ' 🧶 Online members', value: `${interaction.guild.members.cache.filter(member => member.presence?.status == "online").size}`, inline: true })
                .addFields({ name: ' 🌙 Idle memebers', value: `${interaction.guild.members.cache.filter(member => member.presence?.status == "idle").size}`, inline: true })
                .addFields({ name: ' 🎈 Dnd memebers', value: `${interaction.guild.members.cache.filter(member => member.presence?.status == "dnd").size}`, inline: true })
                .setColor('Random')
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            await interaction.reply({ embeds: [EmbedError] });
        } catch (error) {
            return console.log(error);
        }
    }
}