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

client.connect();

client.on('connected', (address, port) => {
	client.action('chrisisawesome', "I have been updated!");
});

client.on('chat', (channel, user, message, self) => {

	/* TODO
		- Make command manager
		- !friend command to return random video game (or movie/tv char?) as your best friend :)
		- Mod commands (!title, !game, etc.)
	*/

	// Whoop command
	if (message === '!whoop') {
		const rngIn = Math.random();

		if (rngIn <= 0.1) {
			client.action('chrisisawesome', "GOAT IN!");
		}
		else {
			const rngOut = Math.random();

			if (rngOut < 0.25) {
				client.action('chrisisawesome', "Reverse long jumps out of existence and crashes your game...");
			}
			if (rngOut >= 0.25 && rngOut < 0.5) {
				client.action('chrisisawesome', "Starts to go in, then I back out at last second...");
			}
			else if (rngOut >= 0.5 && rngOut < 0.75) {
				client.action('chrisisawesome', "Stays sideways at entrance to barn so I don't even attempt to enter...");
			}
			else if (rngOut >= 0.75) {
				client.action('chrisisawesome', "Ignores your whoop...");
			}
		}
	}
});