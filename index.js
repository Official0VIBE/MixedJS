const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const fs = require('fs');
const config = require('./config.json');
require('dotenv').config() // احذف السطر ذا اذا تستخدم ربلت

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

console.log(`▏ GinixBase » Connecting to the database...`)

const MongoDB = require('mongodb');

const Mongoose = require('mongoose');

console.log(`▏ FNLBase » Fetching the (URI)`);
const uri = "mongodb+srv://f5:19827592@cluster0.1yjgllj.mongodb.net/?retryWrites=true&w=majority";
console.log(`▏ FNLBase » (URI) Has been fetched\n▏ URI » ${uri}`);


const dbclient = new MongoDB.MongoClient(uri, {
	useNewUrlParser: true, useUnifiedTopology: true, serverApi: MongoDB.ServerApiVersion.v1
})

try {
	dbclient.connect()
	console.log(`▏ GinixBase » Database has been connected`);
} catch (error) {
  console.log(error);
}

client.login(process.env.TOKEN)
