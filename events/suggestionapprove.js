const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const SugVotes = require('../Schema/suggestions');
client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton) return;

    if(interaction.customId == 'discord-accept-suggestion') {
        if(!interaction.member.roles.cache.has(config.suggestions.SuggestionStaffRole)) return;
        let suggestionData;
        try {
            suggestionData = await SugVotes.findOne({ 
                messageID: interaction.message.id,
            });   
        } catch (error) {
            return console.log(error);
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-accept-suggestion')
            .setEmoji('✔')
            .setLabel('Approved')
            .setStyle('Success')
            .setDisabled(true)
        )
        const embed = new EmbedBuilder()
        .setTitle("🈸  - DISCORD SUGGESTION")
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `APPROVED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Green')

        interaction.message.edit({
            embeds: [embed],
            components: [row]
        })

        const embedlogs = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`🈸  - DISCORD SUGGESTION`)
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `APPROVED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()

        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('acceptedby-suggestion')
            .setEmoji('✔')
            .setLabel('Approved By:')
            .setStyle('Success')
            .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('acceptedby-suggestion-2')
            .setLabel(`${interaction.user.tag}`)
            .setStyle('Success')
            .setDisabled(true)
        )

        interaction.guild.channels.cache.get(config.suggestions.SuggestionLogs).send({
            embeds: [embedlogs],
            components: [row1]

        })
    }else if(interaction.customId == 'other-accept-suggestion') {
        if(!interaction.member.roles.cache.has(config.suggestions.SuggestionStaffRole)) return;
        let suggestionData;
        try {
            suggestionData = await SugVotes.findOne({ 
                messageID: interaction.message.id,
            });

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('other-accept-suggestion')
                .setEmoji('✔')
                .setLabel('Approved')
                .setStyle('Success')
                .setDisabled(true)
            )
            const embed = new EmbedBuilder()
            .setTitle("❓  - OTHER SUGGESTION")
            .addFields(
                { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
                { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
                { name: 'Status:', value: `APPROVED`, inline: false },
            )
            .setThumbnail(interaction.member.displayAvatarURL())
            .setTimestamp()
            .setColor('Green')
            interaction.message.edit({
                embeds: [embed],
                components: [row]
            })
            const embedlogs = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`❓  - OTHER SUGGESTION`)
            .addFields(
                { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
                { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
                { name: 'Status:', value: `APPROVED`, inline: false },
            )
            .setThumbnail(interaction.member.displayAvatarURL())
            .setTimestamp()
            const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('acceptedby-suggestion')
                .setEmoji('✔')
                .setLabel('Approved By:')
                .setStyle('Success')
                .setDisabled(true)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId('acceptedby-suggestion-2')
                .setLabel(`${interaction.user.tag}`)
                .setStyle('Success')
                .setDisabled(true)
            )
            interaction.guild.channels.cache.get(config.suggestions.SuggestionLogs).send({
                embeds: [embedlogs],
                components: [row1]
            })

        } catch (error) {
            return console.log(error)
        }
    }
});