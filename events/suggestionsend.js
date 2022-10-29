const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const SugVotes = require('../Schema/suggestions');
const { default: mongoose } = require('mongoose');

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isModalSubmit) return;
    if(interaction.customId == 'discordsuggestionmodal') {
        const Answer = interaction.fields.getTextInputValue('discordsuggestionmessage');
        const embed = new EmbedBuilder()
        .setTitle("🈸  - DISCORD SUGGESTION")
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${Answer}` + '```', inline: false },
            { name: 'Status:', value: `PENDING`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Orange')

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-accept-suggestion')
            .setEmoji('✔')
            .setLabel('Approve')
            .setStyle('Success')
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-deny-suggestion')
            .setEmoji('❌')
            .setLabel('Reject')
            .setStyle('Danger')
        )

          let sugmsg = await interaction.guild.channels.cache.get(config.suggestions.SuggestionChannel).send({
            embeds: [embed],
            components: [row]
        })


        let votes = await SugVotes.create({
            messageID: sugmsg.id,
            upvotes: 0,
            downvotes: 0,
            suggestion: `${Answer}`
        });

        votes.save();
    }else if(interaction.customId == 'othersuggestionmodal') {
        const Answer = interaction.fields.getTextInputValue('othersuggestionmessage');

        const embed = new EmbedBuilder()
        .setTitle("❓  - OTHER SUGGESTION")
        .addFields(
            { name: 'User', value: `${interaction.member.user.tag}`, inline: false },
            { name: 'Suggestion:', value: '```' + `${Answer}` + '```', inline: false },
            { name: 'Status:', value: `PENDING`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Orange')

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('other-accept-suggestion')
            .setEmoji('✔')
            .setLabel('Approve')
            .setStyle('Success')
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('other-deny-suggestion')
            .setEmoji('❌')
            .setLabel('Reject')
            .setStyle('Danger')
        )

        sugms = await interaction.guild.channels.cache.get(config.suggestions.SuggestionChannel).send({
            embeds: [embed],
            components: [row]
        })

        let votes = await SugVotes.create({
            messageID: sugmsg.id,
            upvotes: 0,
            downvotes: 0,
            suggestion: `${Answer}`
        });

        votes.save();
    }
});