const tmi = require('tmi.js');
const options = {
	options: {
		debug: true,
	},
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username: 'Howard',
		password: 'oauth:kb6ora8ej5dxfcfqblzlfuszx027lm',
	},
	channels: ['chrisisawesome']
};
const client = new tmi.client(options);
const commands = require('./commands.js');

client.connect();
const myUser = 'chrisisawesome';
const channelID = process.env.CHANNEL_ID;

// On connection
client.on('connected', (address, port) => {
	// Send message
	client.action(myUser, "Connected!");
});

// On message received in chat
client.on('chat', (channel, user, message, self) => {
	// If message sent by user
	if (!self) {
		// Run command & get return message to output
		const output = commands.getCommandOutput(user, message);
		console.log("Output: " + output);

		// Output message if given, otherwise do nothing
		if (typeof output === 'string' && output.length > 0) {
			// Send message
			client.action(myUser, output);
		}
	}
});