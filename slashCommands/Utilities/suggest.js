const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRow } = require('discord.js');


module.exports = {
	name: 'suggest',
	description: "Used to sumbit suggestions that will improve the server",
	cooldown: 300000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {


        const embed = new EmbedBuilder()
        .setColor('DarkPurple')
        .setAuthor({ name: 'Suggestion System', iconURL: interaction.guild.iconURL()})
        .setDescription('Select your suggestion category')


        const dropdown = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('suggestion-selector')
                .setPlaceholder(`Select your suggestion's category`)
                .addOptions(
                    {
                    label: 'Discord Category',
                    description: 'Discord related suggestion',
                    value: 'discordsuggestion',
                    emoji: '🈸',
                },
                {
                    label: 'Other Category',
                    description: "Other type-related suggestion",
                    value: 'othersuggestion',
                    emoji: '❓',
                },
                
                )
            
        )



        interaction.reply({
            embeds: [embed],
            components: [dropdown],
            ephemeral: true
        })

    }
};
