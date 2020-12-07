module.exports = {
	getCommandOutput
}

const fetch = require('node-fetch');
//const clientID = '9280shiyoymeok02jptkzl5snjl72s';
const username = 'chrisisawesome';
const prefix = '!';
const commandList = [ "whoop", "goat", "bff", "friend", "love", "title" ];
const friends = {
	"The Legend of Zelda": new Array("the Old Man", "Aquamentus", "Dodongo", "Manhandla", "Gleeok", "Digdogger", "Gohma", "Ganon", "Impa", "Zelda", "the Great Fairy", "Link"),
	"The Legend of Zelda II: The Adventure of Link": new Array("Horsehead", "Jermafenser", "Rebonack", "Carock", "Gooma", "Barba", "Thunderbird", "Link's Shadow", "impa", "the King of Hyrule", "Link", "Zelda"),
	"The Legend of Zelda: Link's Awakening": new Array("Link", "the Wind Fish", "Marin", "Tarin"),
	"The Legend of Zelda: A Link to the Past": new Array("Lanmolas", "Moldorm", "Agahnim", "Helmasaur King", "Arrghus", "Mothula", "Blind the Thief", "Kholdstare", "Vitreous", "Trinexx", "Ganon", "Link", "Zelda", "Sahasrahla", "Aginah", "King Zora", "the King of Hyrule"),
	"The Legend of Zelda: Ocarina of Time": new Array("Gohma", "King Dodongo", "Barinade", "Phantom Ganon", "Volvagia", "Morpha", "Bongo Bongo", "Dark Link", "Dead Hand", "Twinrova", "Ganondorf", "Ganon", "Epona", "the Great Fairy", "Impa", "Link", "Navi", "Pierre", "Zelda", "Rauru", "the Running Man", "Sheik", "the Deku Tree", "Fado", "Mido", "Saria", "Skull Kid", "the Happy Mask Salesman", "the Poe Collector", "Ingo", "Malon", "Talon", "Dampé", "the Bean Guy", "King Zora", "Lord Jabu-Jabu", "Princess Ruto", "Biggoron", "Nabooru", "Kotake", "Koume"),
	"The Legend of Zelda: Majora's Mask": new Array("Captain Keeta", "Wart", "Igos du Ikana", "Garo Master", "Odolwa", "Goht", "Gyorg", "Twinmold", "Majora's Mask", "Majora's Incarnation", "Majora's Wrath", "Link", "Kaepora Gaebora", "Skull Kid", "Zora Link", "Cermia", "Deku Link", "Epona", "Fiercy Deity Link", "Goron Link", "Tingle", "Tatl", "Tael", "Keaton", "Anju", "the Happy Mask Salesman", "Kafei", "Pierre", "the Bean Guy", "Kotake", "Koume", "Mikau", "Garo", "the Poe Collector", "Dampé"),
	"The Legend of Zelda: Oracle of Seasons & Ages": new Array("Veran", "Pumpkin Head", "Head Thwonp", "Shadow Hag", "Eyesoar", "Smog", "Octogon", "Possessed Nayru", "Plasmarine", "Ramrock", "Twinrova", "Ganon", "Aquamentus", "Dodongo", "Mothula", "Gohma", "Digdogger", "Manhandla", "Gleeok", "Medusa Head", "Impa", "Link", "the Maku Tree", "Nayru", "Din", "Zelda", "Queen Ambi", "Ralph"),
	"The Legend of Zelda: Four Swords": new Array("Big Manhandla", "Dera Zol", "Gouen", "Vaati", "Link", "the Great Fairy of Forest", "the Great Fairy of Ice", "the Great Fairy of Flame", "Zelda"),
	"The Legend of Zelda: The Wind Waker": new Array("Gohma", "Kalle Demos", "Gohdan", "Helmaroc King", "Jalhalla", "Molgera", "Puppet Ganon", "Ganondorf", "Phantom Ganon", "Mothula", "Beedle", "Cyclos", "Daphnes Nohansen Hyrule", "Fado", "the  Queen of Fairies", "Fishmen", "Gonzo", "the Great Fairy", "Laruto", "Link", "Zelda", "Senza", "Tetra", "Zephos", "Zuko", "Mako", "Niko", "Aryll", "Jabun", "Orca", "Grandma", "Anton", "Kamo", "Kreeb", "Lenzo", "Linda", "Maggie", "Mila", "Garrickson", "Salvatore", "Minenco", "Tott", "Zunari", "Hoskit", "Baito", "Valoo", "Carlov", "Makar", "Manny", "the Deku Tree", "Ankle", "Knuckle", "David Jr.", "Tingle", "Komali", "Medli", "Quill", "Mrs. Marie", "the King of Red Lions", "Sue-Belle"),
	"The Legend of Zelda: Four Swords Aventures": new Array("Phantom Ganon", "Stone Arrghus", "Helmaroc King", "Frostare", "Vaati", "Ganon", "Tingle", "Link", "Shadow Link", "the Great Fairy", "Kaepora Gaebora"),
	"The Legend of Zelda: The Minish Cap": new Array("Big Green Chuchu", "Gleerok", "Mazaal", "Big Octorok", "Vaati Reborn", "Vaati Transfigured", "Vaati's Wrath", "Ezlo", "Link", "Zelda", "Zeffa", "King Datlus"),
	"The Legend of Zelda: Twilight Princess": new Array("Ook", "King Bulblin", "Dangoro", "Twilit Bloat", "Deku Toad", "Skull Kid", "Death Sword", "Darkhammer", "Phantom Zant", "Diababa", "Fyrus", "Morpheel", "Stallord", "Blizzeta", "Armogohma", "Argorok", "Zant", "Puppet Zelda", "Ganon", "Ganondorf", "Epona", "the Great Fairy", "Hero's Shade", "Impaz", "Link", "Midna", "Ooccoo", "the Postman", "Beth", "Colin", "Fado", "Hanch", "Ilia", "Jaggle", "Malo", "Mayor Bo", "Ordona", "Pergie", "Rusl", "Sera", "Talo", "Uli", "Coro", "Faron", "Eldin", "Trill", "Plumm", "Barnes", "Luda", "Renado", "Shad", "Darbus", "Gor Amoto", "Gor Coron", "Gor Ebizo (sva)", "Gor Liggs", "Fyer", "Auru", "Falbi", "Lanayru", "Hena", "Iza", "Purdy", "Prince Ralis", "Rutela", "Agitha", "Charlo", "Chudley", "Dr. Borville", "Gengle", "Hannah", "Jovani", "Kili", "Louise", "Madame Fanadi", "Misha", "Zelda", "Purlo", "Soal", "Telma", "Ashei", "Yeta", "Yeto"),
	"The Legend of Zelda: Phantom Hourglass": new Array("Blaaz", "Cyclok", "Crayk", "Dongorongo", "Gleeok", "Eox", "Bellum", "Bellumbeck", "Link", "Tetra", "Oshus", "Linebeck", "Ciela", "Leaf", "Neri", "Astrid", "Biggoron", "Beedle", "Postman", "Salvatore", "Jolene"),
	"The Legend of Zelda: Spirit Tracks": new Array("Mothula", "Dark Link", "Stagnox", "Fraaz", "Phytops", "Cragma", "Byrne", "Skeldritch", "Cole", "Malladus", "Link", "Zelda", "Beedle", "Rael", "Anjean", "Postman", "Ferrus", "Alfonzo", "Niko", "Linebeck III", "Joynas", "Bunnio", "Honcho"),
	"The Legend of Zelda: Skyward Sword": new Array("Ghirahim", "Scaldera", "Moldarach", "the Imprisoned", "Koloktos", "Tentalus", "Levias", "Demise", "Fi", "Link", "Zelda", "Impa", "Groose", "Beedle", "Levias", "Strich", "Cawlin", "Batreaux", "Fledge", "Gaepora", "Horwell", "Oawlan", "LD-301S Scrapper", "Kina", "Dodoh", "Bucha", "Erla", "Lopsa", "Machi", "Oolo", "Yerbal", "Eldin", "Faron", "Lanayru"),
	"The Legend of Zelda: A Link Between Worlds": new Array("Yuga", "Moldorm", "Margomill", "Gemesaur King", "Arrghus", "Knucklemaster", "Stalblind", "Zaganaga", "Dharkstare", "Grinexx", "Yuga Ganon", "Shadow Link", "Gramps", "Dampe", "Gulley", "Seres", "Osfala", "Irene", "Oren", "Rosso", "Impa", "Ravio", "Hilda", "Zelda", "Link", "Blacksmith", "Sahasrahla", "Mother Maiamai", "Thief Girl", "the Great Fairy"),
	"The Legend of Zelda: Triforce Heros": new Array("Margoma", "Arrghus", "Moldorm", "Blizzagia", "Stalchampion", "Prismantus", "Lady Maud", "Freezlord", "Gigaleon", "Grim Repoe", "Link", "Lady Maud", "Princess Styla", "the Great Tripini"),
	"The Legend of Zelda: Breath of the Wild": new Array("Hinox", "Talus", "Molduga", "Stalnox", "Windblight Ganon", "Fireblight Ganon", "Thunderblight Ganon", "Ganon", "Calamity Ganon", "Waterblight Ganon", "Urbosa", "Zelda", "Link", "Mipha", "Revali", "Daruk", "Kilton", "Kass", "Epona", "Hetsu", "King Rhoam", "Robbie", "Yunobo", "the Deku Tree", "the Great Fairy", "Riju", "Master Kohga", "Sidon", "Impa", "Paya", "Beedle"),
	"Link: The Faces of Evil": new Array("Goronu", "Harlequin", "Militron", "Glukto", "Lupay", "Ganon", "Zelda", "Link", "King Harkinian", "Duke Onkled", "Impa"),
	"Zelda: The Wand of Gamelon": new Array("Hektan", "Omfak", "Ganon", "Link", "Zelda", "Gwonam"),
	"Zelda's Adventure": new Array("Llort", "Pasquinade", "Aviana", "Malmord", "Agwanda", "Ursore", "Warbane", "Ganon", "Zelda", "Link", "Shurmak", "Gaspra"),
	"Freshly-Picked Tingle's Rosy Rupeeland": new Array("Death Bug", "Captain Stalfos", "Bana Bana", "Ultra Death Bug", "Dora Dora", "Uncle Rupee", "Grand Rupee", "Rupee", "Tingle", "Pinkle", "Uncle Rupee", "Barkle"),
	"Ripended Tingle's Balloon Trip of Love": new Array("Gasoringo", "Big Liar", "Segāre", "Majiyo", "Tingle", "Kakashi", "Buriki", "Lion", "Sensei", "Azusa", "Lona", "Liar"),
	"Hyrule Warriors": new Array("King Dodongo", "Gohma", "Manhandla", "Argorok", "Ganon", "Melmaroc King", "Phantom Ganon", "the Imprisoned", "Link", "Impa", "Sheik", "Lana", "Zelda", "Ganondorf", "Darunia", "Ruto", "Agitha", "Midna", "Zant", "Fi", "Ghirahim", "Cia", "Volga", "Wizzro", "Twili Midna", "Young Link", "Tingle", "Ganon", "Cucco", "Linkle", "Skull Kid", "Toon Link", "Tetra", "King Daphnes", "Medli", "Marin", "Toon Zelda", "Ravio", "Yuga", "the Great Fairy", "Proxi"),
	"Cadence of Hyrule": new Array("Gleeokenspiel", "Gohmaracas", "Octavo", "Ganon", "the NecroDancer", "King Dobongo", "Synthrova", "Tingle", "Cadence", "the King of Hyrule", "the Great Fairy", "Dampé", "Zelda", "Fate", "Beedle", "Frederick", "Link", "Impa", "Octavo", "Shadow Link", "Shadow Zelda", "Yves", "Skull Kid"),
	"Hyrule Warriors: Age of Calamity": new Array("Link", "Impa", "Zelda", "Mipha", "Daruk", "Revali", "Urbosa", "Hestu", "the Great Fairy", "Monk Maz Koshia", "Sidon", "Yunobo", "Teba", "Riju", "Master Kohga", "King Rhoam", "Terrako", "Calamity Ganon")
};

/* TODO
		- Mod commands (!title, !game, etc.)
	*/

// Runs command & outputs message to chat
function getCommandOutput(user, message) {
	const text = message.toLowerCase();

	if (isCommand(text)) {
		switch (text.substring(1)) {
			case "whoop":
			case "goat":
				return DoWhoop(user);
			case "bff":
			case "friend":
				return DoFriend(user);
			case "love":
				return DoLove(user);
			case "title":
				return GetTitle();
		}
	}
}

// Returns string with reply to sender (@chrisisawesome)
function replyToSender(user, output) {
	return "@" + user.username + " " + output;
}

// Returns true if message starts with prefix and if is valid command
function isCommand(message) {
	if (message.startsWith(prefix) && commandList.includes(message.substring(1))) {
		return true;
	}
	return false;
}

// Code for each command goes below here...

async function GetTitle() {
	const response = await GetChannelData();
	if (response.data[0].display_name === 'chrisisawesome') {
		console.log("Title is: " + response.data[0].title); // NOTE: RETURNS PROMISE, NOT STRING!
	}
}

async function GetChannelData() {
	const url = `https://api.twitch.tv/helix/search/channels?query=${username}`;

	var options = {
		'method': 'GET',
		'url': url,
		'headers': {
			'client-id': '9280shiyoymeok02jptkzl5snjl72s',
			'authorization': 'Bearer os86eowen5qj90jiolb0m8eddtffdk'
		}
	};

	const reponse = await fetch(url, options)
		.then (response => response.json());

	return reponse;
}

function DoWhoop(user) {
	const outputs = [
		"[Reverse long jumps out of existence and crashes your game...]",
		"[Starts to go in, then backs out at last second...]",
		"[Stays sideways at entrance to barn so I don't even attempt to enter...]",
		"[Ignores your whoop...]",
		"[Randomly gets triggered and attacks you...]",
		"[Kicks you in the groin...]",
		"[Eats grass just to mock you...]",
	];

	const goatInRng = Math.random();
	const goatInChance = 0.05;

	// If goat goes in
	if (goatInRng <= goatInChance) {
		return replyToSender(user, "GOAT IN!");
	}
	// If goat is a Howard...
	else {
		const goatOutRng = Math.floor(Math.random() * outputs.length) + 1;
		return replyToSender(user, outputs[goatOutRng - 1]);
	}
}

function DoFriend(user) {
	const keys = Object.keys(friends);
	const game = keys[Math.floor(Math.random() * keys.length)];
	const friend = friends[game][Math.floor(Math.random() * friends[game].length)];
	const output = "Your new best friend is " + friend + " from " + game + "!";

	return replyToSender(user, output);
}

function DoLove(user) {
	const keys = Object.keys(friends);
	const game = keys[Math.floor(Math.random() * keys.length)];
	const friend = friends[game][Math.floor(Math.random() * friends[game].length)];
	const output = "Your new love interest is " + friend + " from " + game + "!";

	return replyToSender(user, output);
}