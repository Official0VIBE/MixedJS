const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'say',
	description: "Used to force me to send a message out of your choice",
	cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'message',
            description: "The message you wnt me to say",
            type: '3',
            required: true,
        }
    ],
    run: async(client, interaction) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.deferUpdate;
        const message = interaction.options.getString('message');
        try {
            let SayEmbed = new EmbedBuilder()
            .setTitle(message)
            .setColor('DarkPurple');
            await interaction.channel.send({ embeds: [SayEmbed] });
        } catch (error) {
            return console.log(error);
        }
    }
}