const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, ButtonStyle, AttachmentBuilder, GuildTemplate, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'bug',
	description: "Used to report bugs in this discord server.",
	cooldown: 10000,
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        let bugmodal = new ModalBuilder()
        .setCustomId('BugModal')
        .setTitle('Bug Modal');

        let bugmodaltype = new TextInputBuilder()
        .setCustomId('BugType')
        .setLabel("What is the bug type?")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(100)
        .setPlaceholder('Enter here')
        .setRequired(true)

        let bugmodalexecute = new TextInputBuilder()
        .setCustomId('BugExecute')
        .setLabel("How to execute this bug?")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(10)
        .setMaxLength(100)
        .setPlaceholder('Enter here')
        .setRequired(true)

        let bugmodalknow = new TextInputBuilder()
        .setCustomId('BugKnow')
        .setLabel('What is the bug about?')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(10)
        .setMaxLength(100)
        .setPlaceholder('Enter Here')
        .setRequired(true)

        let bugmodalrate = new TextInputBuilder()
        .setCustomId('BugRate')
        .setLabel("How dangerous is the bug out of 10?")
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(2)
        .setPlaceholder('0-10')
        .setRequired(true)

        const far1 = new ActionRowBuilder().addComponents(bugmodaltype);
        const far2 = new ActionRowBuilder().addComponents(bugmodalexecute);
        const far3 = new ActionRowBuilder().addComponents(bugmodalknow);
        const far4 = new ActionRowBuilder().addComponents(bugmodalrate);
        
        bugmodal.addComponents(far1, far2, far3, far4)
        await interaction.showModal(bugmodal);
    }
}