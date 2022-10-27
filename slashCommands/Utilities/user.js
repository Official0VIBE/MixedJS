const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'user',
	description: "Used to view info about a specific user",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Choose the user you want information about',
            type: '6',
            required: true,
        }
    ],
    run: async(client, interaction) => {
        try {
            const mentionedMember = interaction.options.getMember('user') || interaction.member;

            let Embed = new EmbedBuilder()
                .setAuthor({ name: `${mentionedMember.user.tag}'s Information`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
                .addFields(
                    { name: 'Joined Discord:', value: `**<t:${Math.floor(mentionedMember.user.createdTimestamp / 1000)}:R>**`, inline: true },
                    { name: 'Joined Server:', value: `**<t:${Math.floor(mentionedMember.joinedAt / 1000)}:R>**`, inline: true }
                )
            await interaction.reply({ embeds: [Embed] });
    
        } catch (error) {
            return console.log(error);
        }
    }
}