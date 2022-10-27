const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, messageLink, AttachmentBuilder } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const ms = require('ms');
const moment = require('moment');

client.on('interactionCreate', async(interaction) => {
    if(!interaction.isModalSubmit) return;

    if(interaction.customId == 'BugModal') {
        const BugType = interaction.fields.getTextInputValue('BugType');
        const BugExecuter = interaction.fields.getTextInputValue('BugExecute');
        const BugKnoweldge = interaction.fields.getTextInputValue('BugKnow');
        const BugRating = interaction.fields.getTextInputValue('BugRate');

        let bugreportembed = new EmbedBuilder()
        .setColor('Purple')
        .setTimestamp()
        .setTitle(`:fleur_de_lis:  -  Bug report has been authorized.`)
        .setDescription("** **\n** **")
        .setFields(
            {
            name: ':space_invader: **- BUG INFO**',
            value: '** **\n **:trident:   - Bug Type? -** ```' + BugType + '```\n' + '** **\n **:trident:   - What is this bug about? -** ```' + BugExecuter + '```\n' + '** **\n **:trident:   - How to execute this bug?  -** ```' + BugKnoweldge + '```\n' + '** **\n **:trident:   - How dangerous is this bug out of 10? -** ```' + BugRating + '```',
            inline: true
        },
        {
            name: ':fleur_de_lis: **- REPORTER INFO**',
            value: '** **\n **:trident:   - User -** ' + '```' + interaction.user.username + '#' + interaction.user.discriminator + '```' + `\n<@${interaction.user.id}>` +  '\n' + '** **\n **:trident:   - User ID -** ```' + interaction.user.id + '```\n' + '** **\n **:trident:   - Report Date: -** ```' + moment().format('L') + '```',
            inline: true
        }
        )
        .setThumbnail(interaction.user.displayAvatarURL({ size: 512 }));

        let bugreportembederror = new EmbedBuilder()
        .setColor('Purple')
        .setTimestamp()
        .setTitle(`:fleur_de_lis:  -  Error has occurred while trying to load your bug report!`)

        try {
            interaction.guild.channels.cache.find((ch) => ch.id == config.BugReport.CHANNEL_ID).send({
                embeds: [bugreportembed],
            });
        } catch (error) {
            try {
                return interaction.user.send({ embeds: [bugreportembederror] });
            } catch (error) {
                return;
            }
        }
    }
})