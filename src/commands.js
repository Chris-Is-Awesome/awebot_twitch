module.exports = {
	getCommandOutput
}

const prefix = '!';
const commandList = [ "whoop" ];

/* TODO
		- !friend command to return random video game (or movie/tv char?) as your best friend :)
		- Mod commands (!title, !game, etc.)
	*/

// Runs command & outputs message to chat
function getCommandOutput(user, message) {
	if (isCommand(message)) {
		switch (message.substring(1).toLowerCase()) {
			case "whoop":
				return DoWhoop();
		}
	}
}

// Returns true if message starts with prefix and if is valid command
function isCommand(message) {
	if (message.startsWith(prefix) && commandList.includes(message.substring(1))) {
		return true;
	}
	return false;
}

// Code for each command goes below here...

function DoWhoop() {
	const outputs = [
		"Reverse long jumps out of existence and crashes your game...",
		"Starts to go in, then I back out at last second...",
		"Stays sideways at entrance to barn so I don't even attempt to enter...",
		"Ignores your whoop..."
	];

	const goatInRng = Math.random();
	const goatInChance = 0.1;

	// If goat goes in
	if (goatInRng <= goatInChance) {
		return "GOAT IN!";
	}
	// If goat is a Howard...
	else {
		const goatOutRng = Math.floor(Math.random() * outputs.length) + 1;
		return outputs[goatOutRng - 1];
	}
}