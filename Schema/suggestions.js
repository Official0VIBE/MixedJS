const mongoose = require('mongoose');

const SuggestionsSchema = new mongoose.Schema({
    messageID: {
        type: Number,
    },
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
    suggestion: {
        type: String
    }
})


module.exports = mongoose.model("SugVotes", SuggestionsSchema)

