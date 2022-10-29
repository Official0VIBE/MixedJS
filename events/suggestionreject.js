const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const SugVotes = require('../Schema/suggestions');

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton) return;

    if(interaction.customId == 'discord-deny-suggestion') {
        if(!interaction.member.roles.cache.has(config.suggestions.SuggestionStaffRole)) return;

        
        let suggestionData;

        try {
            suggestionData = await SugVotes.findOne({ 
                messageID: interaction.message.id,
            });
        } catch (error) {
            return console.log(error)
        }


        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-deny-suggestion')
            .setEmoji('❌')
            .setLabel('Rejected')
            .setStyle('Danger')
            .setDisabled(true)
        )


        const embed = new EmbedBuilder()
        .setTitle("🈸  - DISCORD SUGGESTION")
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `REJECTED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Red')

        interaction.message.edit({
            embeds: [embed],
            components: [row]
        })

        const embedlogs = new EmbedBuilder()
        .setTitle(`🈸  - DISCORD SUGGESTION`)
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `REJECTED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Red')

        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('deniedby-suggestion')
            .setEmoji('❌')
            .setLabel('Rejected By:')
            .setStyle('Danger')
            .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('deniedby-suggestion-2')
            .setLabel(`${interaction.user.tag}`)
            .setStyle('Danger')
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
        } catch (error) {
            return console.log(error)
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('other-deny-suggestion')
            .setEmoji('❌')
            .setLabel('Rejected')
            .setStyle('Danger')
            .setDisabled(true)
        )
        const embed = new EmbedBuilder()
        .setTitle("❓  - OTHER SUGGESTION")
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `REJECTED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Red')
        interaction.message.edit({
            embeds: [embed],
            components: [row]
        })
        const embedlogs = new EmbedBuilder()
        .setTitle(`❓  - OTHER SUGGESTION`)
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${suggestionData.suggestion}` + '```', inline: false },
            { name: 'Status:', value: `REJECTED`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Red')
        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('deniedby-suggestion')
            .setEmoji('❌')
            .setLabel('Rejected By:')
            .setStyle('Danger')
            .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('deniedby-suggestion-2')
            .setLabel(`${interaction.user.tag}`)
            .setStyle('Danger')
            .setDisabled(true)
        )
        interaction.guild.channels.cache.get(config.suggestions.SuggestionLogs).send({
            embeds: [embedlogs],
            components: [row1]
        })
    }
});