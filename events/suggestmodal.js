const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isSelectMenu) return;


    if(interaction.customId == 'suggestion-selector') {
        if(interaction.values[0] == 'discordsuggestion') {
            const discordmodal = new ModalBuilder()
            .setCustomId('discordsuggestionmodal')
            .setTitle(`Discord Suggestion`)
    
    
            const DiscordSuggestionMessage = new TextInputBuilder()
            .setCustomId('discordsuggestionmessage')
            .setLabel(`Your Suggestion:`)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Enter your discord-related suggestion here')
            .setRequired(true)
            .setMinLength(10)
            .setMaxLength(800);
    
    
    
            const suggestionrow = new ActionRowBuilder().addComponents(DiscordSuggestionMessage);
    
            discordmodal.addComponents(suggestionrow);
    
    
            await interaction.showModal(discordmodal);
            

        }else if(interaction.values[0] == 'othersuggestion') {
    
            const othermodal = new ModalBuilder()
            .setCustomId('othersuggestionmodal')
            .setTitle(`Other Suggestion`)
        
        
            const otherSuggestionMessage = new TextInputBuilder()
            .setCustomId('othersuggestionmessage')
            .setLabel(`Your Suggestion:`)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Enter your suggestion here')
            .setRequired(true)
            .setMinLength(10)
            .setMaxLength(800);
        
        
        
            const suggestionrow = new ActionRowBuilder().addComponents(otherSuggestionMessage);
        
            othermodal.addComponents(suggestionrow);
        
        
            await interaction.showModal(othermodal);
        }
    }
});