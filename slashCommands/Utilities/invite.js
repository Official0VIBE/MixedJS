const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'invite',
	description: "Used to invite the bot to your server",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        try {
            const link = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`
            const Response = new EmbedBuilder()
            .setTitle("💌 Invite Me")
            .setColor('Purple')
            .setDescription(`**[Invite Me](${link})**`)
            await interaction.reply({embeds: [Response]})
        } catch (error) {
            return console.log(error);
        }
    }
}